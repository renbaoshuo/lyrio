import { ApiProperty } from "@nestjs/swagger";

import { ContestMetaDto } from "./contest-meta.dto";

import { UserMetaDto } from "@/user/dto";
import { ProblemMetaDto } from "@/problem/dto";

export enum QueryRanklistResponseError {
  NO_SUCH_CONTEST = "NO_SUCH_CONTEST",
  PERMISSION_DENIED = "PERMISSION_DENIED"
}

export class RanklistItemDetailDto {
  @ApiProperty()
  usedSubmissionIdForProblem: Record<number, number>;

  @ApiProperty()
  info: unknown;

  @ApiProperty()
  score: number;
}

export class RanklistItemDto {
  @ApiProperty()
  rank: number;

  @ApiProperty()
  user: UserMetaDto;

  @ApiProperty()
  detail?: RanklistItemDetailDto;
}

export class QueryRanklistResponseDto {
  @ApiProperty()
  error?: QueryRanklistResponseError;

  @ApiProperty()
  contest?: ContestMetaDto;

  @ApiProperty({ type: [ProblemMetaDto] })
  problems?: ProblemMetaDto[];

  @ApiProperty({ type: [RanklistItemDto] })
  items?: RanklistItemDto[];

  @ApiProperty()
  count?: number;
}
