import { Body, Controller, Get, Post } from '@nestjs/common';
import { VersionControlDto, VersionControlupdateDto } from 'src/dto';
import { AppUpdateService } from './app-update.service';

@Controller('app-update')
export class AppUpdateController {
      constructor(private version_control_service: AppUpdateService){}
      @Post('/create')
      async createAppVersion (@Body() body:VersionControlDto){
            return this.version_control_service.prepareCreateAppVersion(body)
      }

      @Post('/update')
      async updateAppVersion (@Body() body:VersionControlupdateDto){
            return this.version_control_service.prepareUpdateAppVersion(body)
      }

      @Post('/delete')
      async deleteAppVersion (@Body() body:VersionControlupdateDto){
            return this.version_control_service.prepareDeleteAppVersion(body)
      }

      @Get('/')
      async getAppVersion (){
            return this.version_control_service.prepareVersionData()
      }
}
