sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0204.controller.View1", {
        onInit() {
            // //1. 하나의 객체에 다 넣기
            // let oData = {
            //     catId:["CAT01", "CAT02"],
            //     catName:["야개", "야꼬"],
            //     hospitalId:["H00001"],
            //     hospitalName:["잠실 종합병원"]
            // };
            // let oModel = new JSONModel();
            // oModel.setData(oData);
            // this.getView().setModel(oModel, "mInfo");
            // //2. 3개의 객체
            // let oCatData1 = {
            //     catId1: "CAT01",
            //     catName1: "야개"
            // }
            // let oCatData2 = {
            //     catId2: "CAT02",
            //     catName2: "야꼬"
            // }
            // let oHospitalData = {
            //     hospitalId: "H00001",
            //     hospitalName: "잠실 종합병원"
            // }
            // let cat1Model = new JSONModel();
            // let cat2Model = new JSONModel();
            // let hospitalModel = new JSONModel();
            // cat1Model.setData(oCatData1);
            // cat2Model.setData(oCatData2);
            // hospitalModel.setData(oHospitalData);
            // this.getView().setModel(cat1Model, "cat1Info");
            // this.getView().setModel(cat2Model, "cat2Info");
            // this.getView().setModel(hospitalModel, "hospitalInfo");

            // //3. 2개의 모델
            // let catData = {
            //     catId:["CAT01", "CAT02"],
            //     catName:["야개", "야꼬"]                
            // };
            // let hospitalData = {
            //     hospitalId:["H00001"],
            //     hospitalName:["잠실 종합병원"]
            // };
            // let catModel = new JSONModel();
            // let hospitalModel = new JSONModel();
            // catModel.setData(catData);
            // hospitalModel.setData(hospitalData);
            // this.getView().setModel(catModel, "mCatInfo");
            // this.getView().setModel(hospitalModel, "mHospitalInfo");
        }                    
    });
});