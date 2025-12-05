import { ApiProperty } from "@nestjs/swagger";

import { ContestAnnouncementLocalizedContentDto } from "./contest-announcement-localized-content.dto";

import { UserMetaDto } from "@/user/dto";

export class ContestAnnouncementDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  contestId: number;

  @ApiProperty()
  publisher: UserMetaDto;

  @ApiProperty()
  publishTime: Date;

  @ApiProperty({ type: [ContestAnnouncementLocalizedContentDto] })
  localizedContents: ContestAnnouncementLocalizedContentDto[];
}
