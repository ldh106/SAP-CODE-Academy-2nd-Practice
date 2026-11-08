sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter"
], (Controller,
	JSONModel,
	Filter,
	Sorter) => {
    "use strict";

    //[전역 const] 바뀔 일이 없는 고정값은 const로 한 번만 선언함.
    const sStdDataPath   = "../model/data5Lev.json";
    const sSubDataPath = "../model/subData5Lev.json";

    return Controller.extend("ncode.zc319lev5.controller.View1", {
        onInit() {
            //[this._ 변수] 여러 method에서 반복해서 byId / getModel 하던 것들을 한 번만 찾아서 컨트롤러에 저장함.
            this._oView     = this.getView();
            this._oTabStd   = this._oView.byId("tabStd");               //학생 테이블
            this._oCmbClass = this._oView.byId("cmbClass");             //반 콤보박스
            this._oCmbGroup = this._oView.byId("cmbGroup");             //조 콤보박스
            this._oPanStdDetail = this._oView.byId("panStdDetail");
            this._oPanClassDetail = this._oView.byId("panClassDetail");
            //조/성별/역할/전공/정렬 목록이 들어있는 gInfo 세컨드리 모델과 학생 정보가 들어있는 mInfo 세컨드리 모델 선언
            this._oGroupModel = this._setModel(sSubDataPath, "gInfo");
            this._oStdModel   = this._setModel("", "mInfo");            //모델만 먼저 붙이고 데이터는 아래에서 읽음
            //테이블의 역할/성별 칸이 gInfo 코드표를 쓰기 때문에, 코드표를 다 읽은 다음에 학생 데이터를 읽음
            //(학생이 먼저 그려지면 역할/성별 칸이 빈칸으로 남음)
            let oStdModel = this._oStdModel;
            this._oGroupModel.dataLoaded().then(
                function () {
                    oStdModel.loadData(sStdDataPath);
            });
            //[this._ 변수] [검색] 버튼으로 확정한 반 key. 반 콤보박스만 바꾸고 검색을 안 눌렀을 때
            //세부 검색을 바꿔도 반 조건은 바뀌지 않도록, 콤보박스 값이 아니라 이 값을 필터에 씀
            this._sSearchClassKey = this._oCmbClass.getSelectedKey();
            //처음 화면의 검색 조건(CL303, 2조)과 기본 정렬(이름 오름차순) 적용
            this._applyFilter();
            this._applySorter();
        },

        //[반 검색] 패널의 검색버튼 실행부. 선택한 반을 확정하고 필터를 다시 적용함.
        onSearch(){
            this._oPanClassDetail.setExpanded(false);
            this._oPanStdDetail.setExpanded(false);
            this._oPanClassDetail.unbindElement("mInfo");
            this._oPanStdDetail.unbindElement("mInfo");
            this._sSearchClassKey = this._oCmbClass.getSelectedKey();
            this._applyFilter();
        },

        //[세부 검색] 패널 콤보박스(조/역할/성별/전공)를 바꾸자마자 호출됨
        onDetailChange(){
            this._applyFilter();
        },

        //[정렬 조건] 패널 콤보박스(정렬기준/정렬방향)를 바꾸자마자 호출됨. 정렬은 필터와 상관없으니 정렬만 다시 적용
        onSortChange(){
            this._applySorter();
        },

        //초기화버튼 실행부. 검색 조건과 정렬 조건을 전부 비움 (정렬은 비어있으면 기본값 이름/오름차순)
        onReset(){
            this._oCmbClass.setSelectedKey("");
            this._oCmbGroup.setSelectedKey("");
            this._oView.byId("cmbRole").setSelectedKey("");
            this._oView.byId("cmbGender").setSelectedKey("");
            this._oView.byId("cmbMajor").setSelectedKey("");
            this._oView.byId("cmbSort").setSelectedKey("");
            this._oView.byId("cmbSortDir").setSelectedKey("");
            this._sSearchClassKey = "";
            this._applyFilter();
            this._applySorter();
        },

        onTableSelectionChange(oEvt){
            let oParameter = oEvt.getParameter("listItem");             //선택된 아이템의 Parameter
            if(!oParameter){ return; }
            let oContext = oParameter.getBindingContext("mInfo");
            let sSelectedCId = oContext.getProperty("cId");
            //패널에 bindElement를 통해 선택한 학생의 경로로 지정함.
            //성별/역할 글자는 View에서 formatGender, formatRole로 표시하고, 전공여부는 sMajor를 바로 바인딩함
            this._oPanStdDetail.bindElement("mInfo>" + oContext.getPath());
            //사용자가 선택한 학생정보의 반 정보를 키값삼아서 classList에서 그 키값의 경로를 찾아 반 패널에 바인딩
            let oClassContext = this._getClassContext(sSelectedCId);
            if(oClassContext){
                this._oPanClassDetail.bindElement("mInfo>" + oClassContext.getPath());
            }
            //학생 클릭과 동시에 패널이 펴짐.
            this._oPanClassDetail.setExpanded(true);
            this._oPanStdDetail.setExpanded(true);
        },

        onShowTeacherDetail(){
            let oItem = this._oTabStd.getSelectedItem();
            if(!oItem){ return; }
            let sSelectedCId = oItem.getBindingContext("mInfo").getProperty("cId");
            let oClassContext = this._getClassContext(sSelectedCId);
            if(!oClassContext){ return; }
            //강사 성별은 gInfo 모델의 genderList에서 cTGender, cinTGender(M/F) 키로 꺼냄
            let sTGender  = this._getCodeText("genderList", oClassContext.getProperty("cTGender"));
            let sStGender = this._getCodeText("genderList", oClassContext.getProperty("cinTGender"));
            this._openPopup(oClassContext.getPath(), sTGender, sStGender);
        },

        

        /* ============================== Formatter ============================== */
        //테이블은 행이 여러 개라 행마다 setText를 할 수 없어서, View에서 formatter로 이 함수를 호출함
        //View에서 부르는 함수라서 _ 없이 public으로 둠. 실제로 꺼내는 건 private 함수 _getCodeText가 함
        formatGender(sGender){
            return this._getCodeText("genderList", sGender);
        },
        formatRole(sLeader){
            return this._getCodeText("roleList", sLeader);
        },

        /* ============================== Private Function ============================== */
        //View에서 호출하지 않고 컨트롤러 안에서만 쓰는 함수 → 이름 앞에 _

        //이름 있는 모델을 만들어서 View에 세팅하고, 만든 모델을 돌려줌
        //sPath이 있으면 JSON 파일을 읽어옴
        _setModel(sPath, sModelName){
            let oModel = new JSONModel();
            if(sPath){
                oModel.loadData(sPath);
            }
            this._oView.setModel(oModel, sModelName);
            return oModel;
        },

        //"" 또는 "0"이면 전체(조건 없음)로 봄.
        _isAll(sKey){
            return sKey === "" || sKey === "0";
        },

        //확정된 반 key + 세부 검색 콤보박스 4개를 읽어서 테이블 필터를 적용하는 공통 함수.
        //비어있는(전체) 조건은 빼고 남은 조건만 배열에 담음 → 배열이 비면 filter([]) 로 필터 초기화
        _applyFilter(){
            let sSelectedClassKey  = this._sSearchClassKey;                //[검색]으로 확정한 반
            let sSelectedGroupKey  = this._oCmbGroup.getSelectedKey();
            let sSelectedRoleKey   = this._oView.byId("cmbRole").getSelectedKey();
            let sSelectedGenderKey = this._oView.byId("cmbGender").getSelectedKey();
            let sSelectedMajorKey  = this._oView.byId("cmbMajor").getSelectedKey();
            let aFilters = [];
            if(!this._isAll(sSelectedClassKey)){
                aFilters.push(new Filter("cId", "EQ", sSelectedClassKey));
            }
            if(!this._isAll(sSelectedGroupKey)){
                aFilters.push(new Filter("sGroup", "EQ", sSelectedGroupKey));
            }
            if(sSelectedRoleKey){
                aFilters.push(new Filter("sLeader", "EQ", sSelectedRoleKey));
            }
            if(sSelectedGenderKey){
                aFilters.push(new Filter("sGender", "EQ", sSelectedGenderKey));
            }
            if(sSelectedMajorKey){
                //sMajor는 true/false라서 콤보박스 key(Y/N)를 true/false로 바꿔서 비교
                aFilters.push(new Filter("sMajor", "EQ", sSelectedMajorKey === "Y"));
            }
            this._oTabStd.getBinding("items").filter(aFilters);
        },

        //정렬 기준/방향 콤보박스를 읽어서 테이블 정렬을 적용하는 함수.
        //콤보박스를 비워두면(선택 없음) 기본값: 정렬 기준 = 이름(sName, Lev04와 같은 기준), 정렬 방향 = 오름차순
        _applySorter(){
            let sSortPath = this._oView.byId("cmbSort").getSelectedKey() || "sName";
            let bDescending = this._oView.byId("cmbSortDir").getSelectedKey() === "DESC";
            this._oTabStd.getBinding("items").sort(new Sorter(sSortPath, bDescending));
        },

        //[private 함수] gInfo 모델의 목록(genderList, roleList)에서 key에 해당하는 글자(text)를 꺼냄        
        //ex) _getCodeText("roleList", "L") → roleList에서 key가 "L"인 항목 → "조장"
        _getCodeText(sListName, sKey){
            let oKeyFilter = new Filter("key", "EQ", sKey);
            let oBinding = this._oGroupModel.bindList("/" + sListName, null, null, oKeyFilter);
            let aContexts = oBinding.getCurrentContexts();
            if(!aContexts[0]){ return ""; }                             //못 찾으면 빈 글자
            return aContexts[0].getProperty("text");
        },

        //반 id(cId)로 mInfo>/classList 에서 그 반의 Context를 찾아서 돌려줌
        _getClassContext(sSelectedCId){
            let oClassFilter = new Filter("cId", "EQ", sSelectedCId);
            let oBinding = this._oStdModel.bindList("/classList", null, null, oClassFilter);
            let aContexts = oBinding.getCurrentContexts();
            return aContexts[0];                                        //못 찾으면 undefined
        },

        //팝업 작동부. View에서 직접 부르지 않고 onShowTeacherDetail에서만 부르니까 private으로 바꿈
        _openPopup(sPath, sTGender, sStGender){
            if(!this._pDialog){
                this._pDialog = this.loadFragment({
                    name: "ncode.zc319lev5.view.Popup"
                });
            }
            //then 내부의 function 안에서는 this가 undefined기 때문에 this._oView를 then 전에 변수에 저장함.
            let oView = this._oView;
            this._pDialog.then(
                function (oPopup) {
                    oPopup.bindElement("mInfo>" + sPath);
                    oView.byId("inpCTeacher").setDescription(sTGender);
                    oView.byId("inpCinTeacher").setDescription(sStGender);
                    oPopup.open();
            });
        },
        //팝업 종료
        onClose(){
            this._oView.byId("idDialog").close();
        }
    });
});
