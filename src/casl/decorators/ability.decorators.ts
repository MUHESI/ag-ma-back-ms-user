import { SetMetadata } from "@nestjs/common";
import { Action } from "../../modules/auth/enums/action.enum";
import { Subjects } from "../casl-ability.factory/casl-ability.factory";

export interface RequiredRule {
    action: Action,
    subject: Subjects
}
export const CHECK_ABILITY_KEY = 'check_ability';
export const CheckAbilities = (...requirements: RequiredRule[]) => SetMetadata(CHECK_ABILITY_KEY, requirements)
