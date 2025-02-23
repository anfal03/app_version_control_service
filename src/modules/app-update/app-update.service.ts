import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION, VERSION_CONTROL_HISTORY_REPOSITORY, VERSION_CONTROL_REPOSITORY } from 'src/config/constants';
import { AppVersionControlHistoryModel, AppVersionControlModel } from 'src/models';
import { QueryTypes, Sequelize } from 'sequelize';
import { VersionControlupdateDto } from 'src/dto';

@Injectable()
export class AppUpdateService {
      constructor(
            @Inject(VERSION_CONTROL_REPOSITORY) private readonly versionControlRepository: typeof AppVersionControlModel,
            @Inject(VERSION_CONTROL_HISTORY_REPOSITORY) private readonly versionControlHistoryRepository: typeof AppVersionControlHistoryModel,
            @Inject(DATABASE_CONNECTION) private DB: Sequelize
      ){}
      
      async prepareCreateAppVersion(data){
            const inserQuery = `INSERT INTO app_version_control (app_version, update_action, created_by, remarks, created_at, updatedAt, expire_date)
           VALUES (:version, :action, NULL, :remark, GETDATE(), GETDATE(), :expire_date);`;
           const inserHistoryQuery = `INSERT INTO app_version_control_history (app_version, update_action, created_by, remarks, created_at, updatedAt, expire_date)
           VALUES (:version, :action, NULL, :remark, GETDATE(), GETDATE(), :expire_date);`;
           const replacements = {
            version: data.app_version,
            action: data.update_action,
            remark: data.remarks,
            expire_date: data.expire_date || null
            }

            await this.DB.query(inserQuery, {
            type: QueryTypes.INSERT,
            replacements: replacements
            });

            await this.DB.query(inserHistoryQuery, {
                  type: QueryTypes.INSERT,
                  replacements: replacements
                  });

            const result = await this.versionControlRepository.findOne({
                  order: [['created_at', 'DESC']]
                });
                
            return result;
      }

      async prepareUpdateAppVersion(data: VersionControlupdateDto){
            const {id, ...rest} = data
            const updateFields = [];
            if (data.app_version !== undefined) {
              updateFields.push('app_version = :app_version');
            }
            if (data.update_action !== undefined) {
              updateFields.push('update_action = :update_action');
            }
            if (data.remarks !== undefined) {
              updateFields.push('remarks = :remarks');
            }
            if (data.expire_date !== undefined) {
              updateFields.push('expire_date = :expire_date');
            }
      
            const updateQuery = `
              UPDATE app_version_control
              SET ${updateFields.join(', ')}
              WHERE id = :id
            `;
      
            const replacements = {
              id,
              ...rest,
            };
            await this.DB.query(updateQuery, {
              replacements,
              type: QueryTypes.UPDATE,
            });
            return await this.versionControlRepository.findOne({where:{id:id}})
      }

      async prepareDeleteAppVersion(data: VersionControlupdateDto){
          return await this.versionControlRepository.destroy({ where: { id: data.id } });
      }

      async prepareVersionData(){
            return await this.versionControlRepository.findAll({
                  order: [['created_at', 'DESC']]
                });
      }
}
