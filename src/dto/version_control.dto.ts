
import { IsNotEmpty, MinLength, IsEmail, IsEnum, isEmpty, isBoolean, IsOptional, IsDateString } from 'class-validator';


export class VersionControlDto {

    @IsNotEmpty()
    readonly app_version: string;

    @IsNotEmpty()
    readonly update_action: number;

    readonly remarks: string;

    @IsNotEmpty()
    @IsDateString()
    expire_date: Date;
}

export class VersionControlupdateDto {
    @IsNotEmpty()
    readonly id: number;
    readonly app_version: string;

    readonly update_action: number;

    readonly remarks: string;

    readonly expire_date?: Date;
}
