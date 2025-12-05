import { ApiProperty } from "@nestjs/swagger";

import { IsEnum, IsInt, Min } from "class-validator";

import { Locale } from "@/common/locale.type";

export class QueryContestsRequestDto {
  @ApiProperty()
  @IsEnum(Locale)
  locale: Locale;

  @ApiProperty()
  @IsInt()
  @Min(0)
  skipCount: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  takeCount: number;
}
