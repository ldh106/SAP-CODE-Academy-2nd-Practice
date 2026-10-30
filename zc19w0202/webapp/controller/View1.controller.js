sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("ncode.zc19w0202.controller.View1", {
        onInit() {
        },
        onSearch(){
            let oViewMain = this.getView();
            let oInpSC = oViewMain.byId("inpSC");
            let oRstSC = oViewMain.byId("rstSC");
            let oRstG = oViewMain.byId("rstG");
            let oRstC = oViewMain.byId("rstC");
            let oRstN = oViewMain.byId("rstN");  
            if(oInpSC.getValue() == "S1001") {
                oRstSC.setValue(oInpSC.getValue());
                oRstG.setValue("M");
                oRstC.setValue("3");
                oRstN.setValue("S100010001");
            }else if(oInpSC.getValue() == "S1002"){
                oRstSC.setValue(oInpSC.getValue());
                oRstG.setValue("M");
                oRstC.setValue("3");
                oRstN.setValue("S100010001");
            }else if (oInpSC.getValue() == "S1003"){
                oRstSC.setValue(oInpSC.getValue());
                oRstG.setValue("L");
                oRstC.setValue("3");
                oRstN.setValue("S100010002");
            }else{
                MessageBox.show("잘못된 코드를 입력하셨습니다.", {
                    title: "Error"
                });
            }
        },
        onDetail(){
            let that = this.getView();
            
            if(!this.pPopup){
                this.pPopup = this.loadFragment({
                    name:"ncode.zc19w0202.view.Popup"
                });
            }
            this.pPopup.then(
                
                function (oPopup){
                    let oInpSC = that.byId("inpSC");            
                    let oDtECode = that.byId("dtECode");
                    let oDtEName = that.byId("dtEName");
                    let oDtERole = that.byId("dtERole");
                    let oDtEmail = that.byId("dtEmail");
                    if(oInpSC.getValue() == "S1001"){
                        oDtECode.setValue("100010001");
                        oDtEName.setValue("강석권");
                        oDtERole.setValue("M");
                        oDtEmail.setValue("thinkang@naver.com")
                    }else if(oInpSC.getValue() == "S1002"){
                        oDtECode.setValue("100010001");
                        oDtEName.setValue("강석권");
                        oDtERole.setValue("M");
                        oDtEmail.setValue("thinkang@naver.com");
                    }else if(oInpSC.getValue() == "S1003"){
                        oDtECode.setValue("100010002");
                        oDtEName.setValue("홍길동");
                        oDtERole.setValue("");
                        oDtEmail.setValue("hongkd@naver.com")
                    }else{
                        MessageBox.show("잘못된 코드를 입력하셨습니다.", {
                            title: "Error"
                        });
                    }
                    oPopup.open();
                }
                
            );
                
        },
        onClose(){
            this.getView().byId("dtPopup").close();
        }
    });
});