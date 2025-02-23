import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'app_version_control_history' })

export class AppVersionControlHistoryModel extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey : true
    })
    id: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    app_version: string;

    @Column({
        type: DataType.SMALLINT,
        defaultValue: 0,
        allowNull: true
    })
    update_action: number;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    created_by: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    remarks: string;
    @Column({
        type: DataType.DATE,
        defaultValue: null,
    })
    expire_date: Date;
}
