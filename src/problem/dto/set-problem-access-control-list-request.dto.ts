import { ApiProperty } from "@nestjs/swagger";

import { IsInt, IsObject } from "class-validator";

import { AccessControlList } from "@/permission/permission.service";

import { ProblemPermissionLevel } from "../problem.service";

export class SetProblemAccessControlListRequestDto {
  @ApiProperty()
  @IsInt()
  problemId: number;

  @ApiProperty()
  @IsObject()
  accessControlList: AccessControlList<ProblemPermissionLevel>;
}
