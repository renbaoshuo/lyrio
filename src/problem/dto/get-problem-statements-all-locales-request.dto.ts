import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsIntString } from "@/common/validators";

export class GetProblemStatementsAllLocalesRequestDto {
  @ApiProperty({
    required: false
  })
  @IsIntString()
  @IsOptional()
  readonly id?: string;

  @ApiProperty({
    required: false
  })
  @IsIntString()
  @IsOptional()
  readonly displayId?: string;
}
