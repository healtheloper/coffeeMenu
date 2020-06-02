// models 폴더에 있는 js 파일들을 import
import coffeeList from './models/CoffeeMenu.js';
import beverageList from './models/BeverageMenu.js';
import photoList from './models/SearchMenu.js';
// import 한 모듈을 객체화 하여 사용
const cofList = Object.create(coffeeList);
const bevList = Object.create(beverageList);
const phList = Object.create(photoList);

// 단순히 data 안에 값에 넣어도 오류가 가끔나서 전역변수도 설정했습니다
var coffeeMenus
var beverageMenus
var starBucks
// 커피 메뉴 리스트를 vm 뷰 인스턴스 안 data인 cfMenus 에 넣었습니다
cofList.list().then(function (tableData) {
    vm.cfMenus = tableData;
    coffeeMenus = tableData;
})
// 음료 메뉴 리스트를 vm 뷰 인스턴스 안 data인 bvMenus에 넣었습니다
bevList.list().then(function (tableData) {
    vm.bvMenus = tableData;
    beverageMenus = tableData;
})
// 음료 사진을 pt 뷰 인스턴스 안 data 인 starBucks 안에 넣었습니다
phList.list().then(function (tableData){
    pt.photos = tableData;
    starBucks = tableData;
});

//작성한 html은 두가지 인스턴스로 나뉘는데, 메뉴 부분과 사진부분으로 나뉘어 작성했습니다.
//vm 인스턴스는 메뉴를 표현한 인스턴스입니다.

var vm = new Vue({
    el: '#app',
    data: {
        //버튼을 숨기게 하기 위한 기본값 설정
        puting: false,
        //Input 데이터를 넣은 후, 모두 지웠을 때의 특정 값이 필요해 Input 의 v-model을 message로 설정
        message: '',
        //메뉴 탭을 눌렀을 시 클래스를 바인딩하여 CSS를 적용시킬 것인데, 요구사항중
        //첫 화면의 요구사항이 커피메뉴가 선택되어 있는 상태이므로 커피 탭을 먼저 active 시킵니다.
        tabCofAct: 'active',
        //커피메뉴 js에서 import해온 값을 넣습니다.
        cfMenus: coffeeMenus,
        //음료메뉴 js에서 import해온 값을 넣습니다.
        bvMenus: beverageMenus,
        //음료탭은 초기 색지정이 안되어 있으므로 클래스바인딩시 공백을 넣었습니다.
        tabBevAct: '',
        //탭을 숨기기 위한 v-show 값을 설정해놓았으며, 초기에는 탭이 보여지므로 true를 넣었습니다.
        hideTabs: true,
        //마찬가지로 커피 메뉴 리스트에 v-show 를 설정했습니다.
        onCoffee: true,
        //처음엔 커피 메뉴가 보여지므로, 음료메뉴는 v-show 를 false로 설정했습니다.
        onBeverage: false,
        //음료 리스트에 항목이 없을 때 경고문구로, 현재는 항목이 있는 상태여서 공백입니다.
        //음료 리스트에 항목이 다 사라질시, 콧수염 태그와 data 값 매칭을 통하여 경고문구를 출력합니다.
        warningBev: '',
        //커피 리스트도 마찬가지로 항목이 있는 상태이므로 공백입니다.
        warningCof: '',
        // 
        submitCheck:false
    },
    methods: {
        //input에 keyup 시 리셋버튼이 보여지기 위한 메소드입니다.
        showResetBtn: function () {
            // keyup 중, input에 v-model을 설정하여 요구 사항중 검색 결과를 모두 지우면
            // 다시 메뉴창이 나타나게 하기 위하여 만든 조건으로, 모든 검색어를 지울 시 초기 상태로 돌아갑니다.
            // 단순히 message=''를 조건으로 하였을 경우 아무것도 작성하지 않고 엔터키를 쳤을 때 검색결과가
            // 아주 잠깐만 보이게 되어서 submitCheck 라는 체크항목을 넣고, 검색어를 지우게 되었을 때 발생하는
            // 이벤트를 이용하여 엔터키를 눌렀을때 결과가 계속 보이는 것과, 
            // 검색어를 모두 지웠을 때 메뉴탭이 다시 보이게 하는 두 가지를 모두 구현하였습니다.
            if (this.message == '' && this.submitCheck == false) {
                this.puting = false;
                this.hideTabs = true;
                //pt 뷰 인스턴스의 data값에 showImage를 넣어 v-show 로 매칭하여 메뉴 입력 폼에 검색결과가
                // 모두 삭제 되면 검색 결과도 삭제되게 하였습니다.
                pt.showImage = false;
                //커피메뉴, 음료메뉴 각 탭을 선택한 상황에서 검색결과를 삭제 시켰을 시 탭의 메뉴 항목이 일치하게
                //보여 지기 위하여 작성했습니다
                if(this.tabCofAct == 'active') {
                    // 커피탭이 선택되었다면 커피메뉴 리스트의 v-show를 true, 음료메뉴 리스트의 v-show를 false
                    this.onCoffee = true;
                    this.onBeverage = false;
                }
                if(this.tabBevAct == 'active') {
                    // 음료탭이 선택되었다면 음료메뉴 리스트의 v-show를 true, 커피메뉴 리스트의 v-show를 false
                    this.onBeverage = true;
                    this.onCoffee = false;
                }
            } else {
                //keyup 중이라면 버튼의 v-show를 true로 하여 보여지게 합니다.
                this.puting = true;
            }
        },
        // 메뉴 입력 폼의 리셋 버튼을 눌렀을 때 발생하는 메소드입니다  
        // 검색어를 지웠을 때 발생하게 한 showResetBtn 메소드 조건중 
        //(this.message == '' && this.submitCheck == false) 일때 와 동일합니다.
        hideResetBtn: function () {
            this.puting = false;
            this.hideTabs = true;
            pt.showImage = false;
            this.message = "";
            if (this.tabCofAct == 'active') {
                this.onCoffee = true;
                this.onBeverage = false;
            }
            if (this.tabBevAct == 'active') {
                this.onBeverage = true;
                this.onCoffee = false;
            } 
        },
        // 커피메뉴 탭을 눌렀을 때 발생하는 메소드로, <li></li> 태그에 @click 을 이용하였으며, data값을 수정하여 보여지는 메뉴와 탭 색을 설정합니다
        clickCof: function () {
            this.tabBevAct = '';
            this.tabCofAct = 'active';
            this.onCoffee = true;
            this.onBeverage = false;
            // 커피메뉴 탭이 눌려있는 상태에서 커피메뉴가 모두 삭제되었을 때 발생하는 조건문입니다. 
            // 아래 음료메뉴 리무브 메소드와 같이 이벤트 발생에 맞춰 reactivity 하게 설정하고 싶었는데, 커피메뉴는 리무브 메소드를 따로 구현하지 않아 코드만 작성하였습니다. 
            if (vm.cfMenus.length == 1){
                this.warningCof = "커피 메뉴가 등록되지 않았습니다."
            }
        },
        // 음료메뉴 탭을 눌렀을 때 발생하는 메소드로, 커피메뉴 탭과 동일합니다.
        clickBev: function () {
            this.tabCofAct = '';
            this.tabBevAct = 'active';
            this.onCoffee = false;
            this.onBeverage = true;
            // warningBev 값을 띄우는 조건입니다. (음료 메뉴가 없는 경우)
            if (vm.bvMenus.length == 1) {
                this.warningBev = "등록된 음료 메뉴가 없습니다."
            }
        },
        
        // 결과를 Submit하면, submit check를 true로 하여 조건문을 통해 검색 결과창이 지속되도록 하는데, 
        // 결과 값을 지우게 되면 v-on:keyup.delete 이벤트를 받아 submit check가 다시 false가 되게 하여
        // 검색어를 모두 지웠을 경우 다시 메뉴 탭이 보이게 하였습니다.
        showMenu:function(){
            this.submitCheck = false;
        },
        // 음료 메뉴 항목을 삭제하기 위한 메소드입니다. 삭제시 bevList가 동기화 되게끔 하기 위하여
        // 이벤트 발생시마다 bvMenus 값을 초기화하게 하였고 하위컴포넌트의 이벤트를 통해 상위컴포넌트의
        // 메소드를 실행하게끔 하는 구조로 하위컴포넌트인 beverage-button의 클릭이벤트를 받습니다.
        removeBev:function(name){
            beverageList.remove(name);
            bevList.list().then(function (tableData) {
                vm.bvMenus = tableData;
                beverageMenus = tableData;
            });
            // 음료 메뉴 항목이 없을시 경고문구이며 콧수염태그를 이용하여 나타냅니다.
            if (vm.bvMenus.length == 1) {
                this.warningBev = "등록된 음료 메뉴가 없습니다."
            }
        },
        // input을 통해 값이 submit이 되면 검색 결과 이미지만이 보여지게 하기위해 작성한 메소드입니다.
        // 검색결과 이미지를 제외한 메뉴탭들이 v-show가 false가 되며, 입력 폼에 값이 없이 엔터(Submit)
        // 를 하더라도, 검색 결과값 이미지가 유지되게 하기 위하여 submitCheck를 true로 설정하였습니다.
        onSubmit:function(){
            pt.showImage = true;
            this.hideTabs = false;
            this.onCoffee = false;
            this.onBeverage = false;
            this.submitCheck = true;
        }
    },
    components: {
        // 커피 메뉴의 '번호'를 나타내는 컴포넌트이며, 상위 컴포넌트의 값을 prop하여 속성을 propsdata로
        // 하여 데이터를 받아 작성했습니다.
        'coffee-number': {
            template: '<span class="number">{{propsdata+1}}</span>',
            props: ['propsdata']
        },
        // 커피 메뉴의 '메뉴, 가격'을 나타내는 컴포넌트이며, 메뉴를 클릭시 input v-model의 message 값에
        // 해당 데이터가 입력되도록 하였고, input에 값을 수동으로 입력했을때와 동일하게 동작 하게끔
        // vm 인스턴스의 onSubmit 메소드가 실행되게끔, 리셋버튼을 보여지게 하였습니다.
        'coffee-name': {
            template: '<span @click="nameClick(propsdata)">{{propsdata.name}}</span>',
            props: ['propsdata'],
            methods:{
                nameClick: function(propsdata){
                    vm.message = propsdata.name;
                    vm.onSubmit();
                    vm.puting = true;
                }
            }
        },
        // 음료 메뉴의 '가격'을 나타내는 컴포넌트 입니다.
        'beverage-price': {
            template: '<span class="number">{{propsdata.price}}</span>',
            props: ['propsdata']
        },
        // 음료 메뉴의 '이름'을 나타내는 컴포넌트 입니다.
        // 커피 메뉴와 마찬가지로 메뉴의 이름을 클릭하였을 때 검색 결과 화면이 보여지게 하였습니다.
        // 방법은 동일합니다.
        'beverage-name': {
            template: '<span @click="nameClick(propsdata)">{{propsdata.name}}</span>',
            props: ['propsdata'],
            methods: {
                nameClick: function (propsdata) {
                    vm.message = propsdata.name;
                    vm.onSubmit();
                    vm.puting = true;
                }
            }
        },
        // 음료 메뉴 탭의 삭제버튼 입니다. 
        // 상위 컴포넌트에 이벤트를 주기 위하여 this.$emit을 사용하였고 pass라는 이름으로 이벤트를 전달하게 하였습니다.
        // 삭제되는 항목의 name 값을 주기 위하여 prop 도 사용하였습니다.
        'beverage-button': {
            template: '<button type="reset" @click="remove(propsdata)"></button>',
            methods:{
                remove: function(propsdata){
                    this.$emit('pass', propsdata.name)
                }
            },
            props:['propsdata']
        },
        
    }
});

// 검색 결과 사진을 나타내는 뷰 인스턴스입니다.
var pt = new Vue({
    el:'#search-result',
    data: {
        photos: starBucks,
        //검색 결과를 나타내기 위한 이벤트 발생시 v-model을 true로 변경하게 하여 사용하였습니다.
        showImage:false
    },
    components:{
        'coffee-image': {
            template: '<img>',
            props: ['propsdata']
        },
        'coffee-name' :{
            template: '<div>{{propsdata.name}}</div>',
            props: ['propsdata']
        }
    }
});


