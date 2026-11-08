sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/m/MessageBox"
], (Controller, JSONModel, Filter, MessageBox) => {
    "use strict";

    return Controller.extend("ncode.zc319lev1.controller.View1", {
        onInit() {
            // data1Lev.json을 전달받아서 View에서 사용 가능한 세컨드모델(mInfo)로 세팅.
            let oModel = new JSONModel();
            oModel.loadData("../model/data1Lev.json");
            this.getView().setModel(oModel, "mInfo");
            //초기화면에 CL303으로 설정되어있는 반 코드를 필터링하여 테이블의 정보를 cId가 CL303인 학생의 정보만 출력하게 함.
            let oFilter = new Filter("cId", "EQ", this.getView().byId("inpCId").getValue());
            this.getView().byId("tabStd").getBinding("items").filter(oFilter);
        },
        onSearch(){
            let oView = this.getView();
            let sInpCId = oView.byId("inpCId").getValue();
            //console.log(sInpCId);     sInpCId 값 테스트
            let oFilter = new Filter("cId", "EQ", sInpCId);
            let oModel = oView.getModel("mInfo");
            //console.log(oModel)   oModel 제대로 불러왔는지 테스트
            let tabStd = oView.byId("tabStd");
            tabStd.getBinding("items").filter(oFilter);
            //console.log(tabStd.getBinding("items").aIndices);
            //필터링 후에 테이블에 바인딩되어있는 아이템들의 aIndices속성 -> 필터링 된 데이터가 원본 데이터에서 갖는 인덱스
            // 의 길이가 0이면 필터링된 반의 정보가 없으므로 없는 반 코드로 처리함.     
            if(tabStd.getBinding("items").aIndices.length == 0) {   
                MessageBox.show(sInpCId + "는 없는 반 코드입니다.", {
                title: "Error"
                });
                oView.byId("inpCId").setValue("");      //없는 반 코드였으므로 입력한 반 코드를 삭제함.
            }
        }
    });
});