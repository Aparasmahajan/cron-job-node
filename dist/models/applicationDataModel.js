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
exports.ApplicationDataModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let ApplicationDataModel = class ApplicationDataModel extends sequelize_typescript_1.Model {
};
exports.ApplicationDataModel = ApplicationDataModel;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], ApplicationDataModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "application_name" }),
    __metadata("design:type", String)
], ApplicationDataModel.prototype, "applicationName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, field: "application_url" }),
    __metadata("design:type", String)
], ApplicationDataModel.prototype, "applicationUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, field: "is_active"
    }),
    __metadata("design:type", Boolean)
], ApplicationDataModel.prototype, "isActive", void 0);
exports.ApplicationDataModel = ApplicationDataModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "application_data",
        timestamps: true
    })
], ApplicationDataModel);
exports.default = ApplicationDataModel;
