sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
   

    return Controller.extend("ncode.zc19w0104.controller.View1", {
        onInit() {
        },
        onClick: function(){
            let oView = this.getView();
            let inpSC = oView.byId("inpSkillCode");
            let inpSN = oView.byId("inpSkillName");
            let btnS = oView.byId("btnSearch");
            let chkG = oView.byId("chkGrade");
            if(inpSC.getValue()){
                switch(inpSC.getValue()){
                    case "S001":
                        inpSN.setValue("SAPUI5");
                        chkG.setSelected(true);
                        break;
                    case "S002":
                        inpSN.setValue("ABAP");
                        chkG.setSelected(false);
                        break;
                    case "S003":
                        inpSN.setValue("RAP");
                        chkG.setSelected(false);
                        break;
                    default:
                        inpSN.setValue("");
                        chkG.setSelected(false);
                        MessageBox.show("잘못된 과목 코드입니다.", {
                            title: "SkillCode Error"
                        });
                }
            } else if(inpSN.getValue()){
                switch(inpSN.getValue()){
                    case "SAPUI5":
                        inpSC.setValue("S001");
                        chkG.setSelected(true);
                        break;
                    case "ABAP":
                        inpSC.setValue("S002");
                        chkG.setSelected(false);
                        break;
                    case "RAP":
                        inpSC.setValue("S003");
                        chkG.setSelected(false);
                        break;
                    default:
                        inpSC.setValue("");
                        chkG.setSelected(false);
                        MessageBox.show("잘못된 과목 이름입니다.", {
                            title: "SkillName Error"
                        })
                }
            }else{
                inpSN.setValue("");
                inpSC.setValue("");
                chkG.setSelected(false);
                MessageBox.show("과목 코드와 과목 이름 중 하나를 입력해 주십시오.", {
                    title: "Error"
                });
            }
        }
    });
});