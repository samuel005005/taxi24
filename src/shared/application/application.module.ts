import { Module } from "@nestjs/common";
import { DomainModule } from "../domain/domain.module";
import { DRIVER_USECASES } from "./usecases";


@Module({
    imports: [
        DomainModule,

    ],
    providers: [
        ...DRIVER_USECASES,
        // { provide: 'PokemonRepository', useClass: PokemonRepositoryMongo },
    ],
    exports: [...DRIVER_USECASES],
})
export class ApplicationModule { }