"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerDataModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let LoggerDataModel = class LoggerDataModel extends sequelize_typescript_1.Model {
};
exports.LoggerDataModel = LoggerDataModel;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], LoggerDataModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "api_url" }),
    __metadata("design:type", String)
], LoggerDataModel.prototype, "apiUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "api_msg" }),
    __metadata("design:type", String)
], LoggerDataModel.prototype, "apiMsg", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "api_status" }),
    __metadata("design:type", String)
], LoggerDataModel.prototype, "apiStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "campaign_old_status" }),
    __metadata("design:type", String)
], LoggerDataModel.prototype, "campaignOldStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "campaign_new_status" }),
    __metadata("design:type", String)
], LoggerDataModel.prototype, "campaignNewStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "campaign_name" }),
    __metadata("design:type", String)
], LoggerDataModel.prototype, "campaignName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "application_name" }),
    __metadata("design:type", String)
], LoggerDataModel.prototype, "applicationName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false, field: "campaign_start_date" }),
    __metadata("design:type", Date)
], LoggerDataModel.prototype, "campaignStartDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false, field: "campaign_end_date" }),
    __metadata("design:type", Date)
], LoggerDataModel.prototype, "campaignEndDate", void 0);
exports.LoggerDataModel = LoggerDataModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "logger_data",
        timestamps: true
    })
], LoggerDataModel);
exports.default = LoggerDataModel;
