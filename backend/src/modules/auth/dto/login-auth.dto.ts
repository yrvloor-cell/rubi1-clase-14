import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { LoginAuthDto } from "./register-auth.dto";

export class RegisterAuthDto extends PartialType(LoginAuthDto){
    @IsNotEmpty()
    name!: string;

}