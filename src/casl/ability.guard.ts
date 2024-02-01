import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { CHECK_ABILITY_KEY, RequiredRule } from './decorators/ability.decorators';
import { Ability, ForbiddenError, subject } from '@casl/ability';
import { currentUser } from 'src/modules/user/user.controller';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AbilityGuard implements CanActivate {
    constructor
        (
            private reflector: Reflector,
            private casAbilityFactory: AbilityFactory

        ) { }

    canActivate(context: ExecutionContext): boolean {
        const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY_KEY,
            context.getHandler()
            // context.getClass(),
        ) || [];
        if (!rules) {
            return true;
        }
        // const { user } = context.switchToHttp().getRequest();
        console.log('currentUser :>> ', currentUser);
        // const ability = this.casAbilityFactory.defineAbility(currentUser)
        // console.log('user :>> ', user);
        // console.log('rules <<<:>> ', rules);

        try {
            // const res = rules.every((rule) => ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject))
            console.clear()
            // console.log('res :>> ', res);
            // return res
            // return true
        } catch (error) {

            throw new ForbiddenException(rules)


        }


        // return rules.some((role) => user.roles?.includes(role));
    }
}