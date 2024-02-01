import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "../../modules/auth/enums/action.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";

class Article {
    id: number;
    isPublished: boolean;
    authorId: number;
}

export type Subjects = InferSubjects<typeof Article | typeof UserEntity> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: UserEntity) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);
        console.log('user.role :>> ', user);

        if (user.role === 'ADMIN') {
            // console.log('user :>> ', user);
            can(Action.Manage, 'all');
            // cannot(Action.Manage, 'all', { fName: { $ne: user.fName } }).because("You can only menage users in your own organization");
        } else {
            can(Action.Read, 'all');
            cannot(Action.Create, 'all').because("Oops Only users who has this privilege can create in this resource ");
        }

        // can(Action.Update, Article, { authorId: user.id });
        // cannot(Action.Delete, Article, { isPublished: true });

        return build({
            // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
