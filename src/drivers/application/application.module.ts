import { Module } from "@nestjs/common";
import { DomainModule } from "../domain/domain.module";
import { DRIVER_USECASES } from "./usecases";


@Module({
    imports: [
        DomainModule,

    ],
    providers: [
        ...DRIVER_USECASES,
    ],
    exports: [],
})
export class ApplicationModule { }