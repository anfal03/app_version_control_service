import { Module } from '@nestjs/common';
import { AppUpdateService } from './app-update.service';
import { AppUpdateController } from './app-update.controller';
import { VERSION_CONTROL_HISTORY_REPOSITORY, VERSION_CONTROL_REPOSITORY } from 'src/config/constants';
import { AppVersionControlHistoryModel, AppVersionControlModel } from 'src/models';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AppUpdateService,
    {
      provide: VERSION_CONTROL_REPOSITORY,
      useValue: AppVersionControlModel,
    },
    {
      provide: VERSION_CONTROL_HISTORY_REPOSITORY,
      useValue: AppVersionControlHistoryModel,
    }
  ],
  controllers: [AppUpdateController]
})
export class AppUpdateModule {}
