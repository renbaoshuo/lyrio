import { Injectable } from "@nestjs/common";

import moment from "moment";

import { ParticipantDetail } from "@/contest/contest-participant.entity";
import { ContestTypeServiceInterface } from "@/contest/contest-type-service.interface";
import { restrictProperties } from "@/common/restrict-properties";
import { SubmissionStatus } from "@/submission/submission-status.enum";

import { SubmissionBasicMetaDto } from "@/submission/dto";

interface ContestTypeOptionsIcpc {
  penaltyTime: number;
}

type ParticipantDetailInfoIcpc = Record<
  number,
  {
    failedAttempts: number;
    calculatedTime: number;
  }
>;

@Injectable()
export class ContestTypeIcpcService
  implements ContestTypeServiceInterface<ContestTypeOptionsIcpc, ParticipantDetailInfoIcpc>
{
  validateConfig(contestTypeOptions: ContestTypeOptionsIcpc): boolean {
    if (!(Number.isSafeInteger(contestTypeOptions.penaltyTime) && contestTypeOptions.penaltyTime >= 0)) return false;
    restrictProperties(contestTypeOptions, ["penaltyTime"]);
    return true;
  }

  async onSubmissionUpdated(
    problemId: number,
    userId: number,
    startTime: Date,
    submission: SubmissionBasicMetaDto,
    detail: ParticipantDetail<ParticipantDetailInfoIcpc>,
    contestTypeOptions: ContestTypeOptionsIcpc
  ): Promise<void> {
    detail.info ??= {};
    detail.info[problemId] ??= {
      failedAttempts: 0,
      calculatedTime: null
    };

    const problemInfo = detail.info[problemId];

    // If the user's the problem is already accepted ...
    // Why keep submitting !!! It's ICPC NOT NOI !!!
    if (problemInfo.calculatedTime != null) return;

    if (submission.status !== SubmissionStatus.Accepted) problemInfo.failedAttempts++;
    else {
      problemInfo.calculatedTime =
        moment(submission.submitTime).diff(startTime, "second") +
        problemInfo.failedAttempts * contestTypeOptions.penaltyTime;

      // Update score: score represents the number of accepted problems in ICPC
      detail.score = (detail.score || 0) + 1;
      detail.usedSubmissionIdForProblem[problemId] = submission.id;

      // Calculate total penalty time by summing up all calculatedTime values
      detail.totalPenaltyTime = Object.values(detail.info)
        .filter(info => info.calculatedTime != null)
        .reduce((sum, info) => sum + info.calculatedTime, 0);
    }
  }
}
