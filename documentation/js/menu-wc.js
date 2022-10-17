'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">api-petlove documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-a534dae65d2ce0bdc3d0cf8d96ac3c8b02e74f6cfdf03025946d029b1ab2a74a22ea4333fa279c1980160bb124abc57947657c28b44a69892a66105e889fa714"' : 'data-target="#xs-controllers-links-module-AppModule-a534dae65d2ce0bdc3d0cf8d96ac3c8b02e74f6cfdf03025946d029b1ab2a74a22ea4333fa279c1980160bb124abc57947657c28b44a69892a66105e889fa714"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-a534dae65d2ce0bdc3d0cf8d96ac3c8b02e74f6cfdf03025946d029b1ab2a74a22ea4333fa279c1980160bb124abc57947657c28b44a69892a66105e889fa714"' :
                                            'id="xs-controllers-links-module-AppModule-a534dae65d2ce0bdc3d0cf8d96ac3c8b02e74f6cfdf03025946d029b1ab2a74a22ea4333fa279c1980160bb124abc57947657c28b44a69892a66105e889fa714"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-a534dae65d2ce0bdc3d0cf8d96ac3c8b02e74f6cfdf03025946d029b1ab2a74a22ea4333fa279c1980160bb124abc57947657c28b44a69892a66105e889fa714"' : 'data-target="#xs-injectables-links-module-AppModule-a534dae65d2ce0bdc3d0cf8d96ac3c8b02e74f6cfdf03025946d029b1ab2a74a22ea4333fa279c1980160bb124abc57947657c28b44a69892a66105e889fa714"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a534dae65d2ce0bdc3d0cf8d96ac3c8b02e74f6cfdf03025946d029b1ab2a74a22ea4333fa279c1980160bb124abc57947657c28b44a69892a66105e889fa714"' :
                                        'id="xs-injectables-links-module-AppModule-a534dae65d2ce0bdc3d0cf8d96ac3c8b02e74f6cfdf03025946d029b1ab2a74a22ea4333fa279c1980160bb124abc57947657c28b44a69892a66105e889fa714"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-65e3d585ea09b012f900079522775e4b5c3acb88ef1494d89ddbd19afabb4816f14636195d7af53b38a5ff51dc19f0399a8a34cc11a8e425533464800566ff29"' : 'data-target="#xs-controllers-links-module-AuthModule-65e3d585ea09b012f900079522775e4b5c3acb88ef1494d89ddbd19afabb4816f14636195d7af53b38a5ff51dc19f0399a8a34cc11a8e425533464800566ff29"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-65e3d585ea09b012f900079522775e4b5c3acb88ef1494d89ddbd19afabb4816f14636195d7af53b38a5ff51dc19f0399a8a34cc11a8e425533464800566ff29"' :
                                            'id="xs-controllers-links-module-AuthModule-65e3d585ea09b012f900079522775e4b5c3acb88ef1494d89ddbd19afabb4816f14636195d7af53b38a5ff51dc19f0399a8a34cc11a8e425533464800566ff29"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-65e3d585ea09b012f900079522775e4b5c3acb88ef1494d89ddbd19afabb4816f14636195d7af53b38a5ff51dc19f0399a8a34cc11a8e425533464800566ff29"' : 'data-target="#xs-injectables-links-module-AuthModule-65e3d585ea09b012f900079522775e4b5c3acb88ef1494d89ddbd19afabb4816f14636195d7af53b38a5ff51dc19f0399a8a34cc11a8e425533464800566ff29"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-65e3d585ea09b012f900079522775e4b5c3acb88ef1494d89ddbd19afabb4816f14636195d7af53b38a5ff51dc19f0399a8a34cc11a8e425533464800566ff29"' :
                                        'id="xs-injectables-links-module-AuthModule-65e3d585ea09b012f900079522775e4b5c3acb88ef1494d89ddbd19afabb4816f14636195d7af53b38a5ff51dc19f0399a8a34cc11a8e425533464800566ff29"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' : 'data-target="#xs-injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' :
                                        'id="xs-injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultModule.html" data-type="entity-link" >ResultModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ResultModule-bcb6651adf77d500af43acc41fb521ef744cb1435d799eedc482b40a41807f8a9c41819249b3a2b17a1f95e30f403ae229428a39432964b39c13d260e2912a8e"' : 'data-target="#xs-controllers-links-module-ResultModule-bcb6651adf77d500af43acc41fb521ef744cb1435d799eedc482b40a41807f8a9c41819249b3a2b17a1f95e30f403ae229428a39432964b39c13d260e2912a8e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResultModule-bcb6651adf77d500af43acc41fb521ef744cb1435d799eedc482b40a41807f8a9c41819249b3a2b17a1f95e30f403ae229428a39432964b39c13d260e2912a8e"' :
                                            'id="xs-controllers-links-module-ResultModule-bcb6651adf77d500af43acc41fb521ef744cb1435d799eedc482b40a41807f8a9c41819249b3a2b17a1f95e30f403ae229428a39432964b39c13d260e2912a8e"' }>
                                            <li class="link">
                                                <a href="controllers/ResultController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ResultModule-bcb6651adf77d500af43acc41fb521ef744cb1435d799eedc482b40a41807f8a9c41819249b3a2b17a1f95e30f403ae229428a39432964b39c13d260e2912a8e"' : 'data-target="#xs-injectables-links-module-ResultModule-bcb6651adf77d500af43acc41fb521ef744cb1435d799eedc482b40a41807f8a9c41819249b3a2b17a1f95e30f403ae229428a39432964b39c13d260e2912a8e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResultModule-bcb6651adf77d500af43acc41fb521ef744cb1435d799eedc482b40a41807f8a9c41819249b3a2b17a1f95e30f403ae229428a39432964b39c13d260e2912a8e"' :
                                        'id="xs-injectables-links-module-ResultModule-bcb6651adf77d500af43acc41fb521ef744cb1435d799eedc482b40a41807f8a9c41819249b3a2b17a1f95e30f403ae229428a39432964b39c13d260e2912a8e"' }>
                                        <li class="link">
                                            <a href="injectables/ResultService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpecialtiesModule.html" data-type="entity-link" >SpecialtiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SpecialtiesModule-ed52762dfe62f9efd1862a5e228a4a0026e3f4098f2ebc0f7f8f3e6a6613040300ead897bfdb298f3cc81678b20b5036136bdb8b98169b4271074c6e2585aa84"' : 'data-target="#xs-controllers-links-module-SpecialtiesModule-ed52762dfe62f9efd1862a5e228a4a0026e3f4098f2ebc0f7f8f3e6a6613040300ead897bfdb298f3cc81678b20b5036136bdb8b98169b4271074c6e2585aa84"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SpecialtiesModule-ed52762dfe62f9efd1862a5e228a4a0026e3f4098f2ebc0f7f8f3e6a6613040300ead897bfdb298f3cc81678b20b5036136bdb8b98169b4271074c6e2585aa84"' :
                                            'id="xs-controllers-links-module-SpecialtiesModule-ed52762dfe62f9efd1862a5e228a4a0026e3f4098f2ebc0f7f8f3e6a6613040300ead897bfdb298f3cc81678b20b5036136bdb8b98169b4271074c6e2585aa84"' }>
                                            <li class="link">
                                                <a href="controllers/SpecialtiesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecialtiesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SpecialtiesModule-ed52762dfe62f9efd1862a5e228a4a0026e3f4098f2ebc0f7f8f3e6a6613040300ead897bfdb298f3cc81678b20b5036136bdb8b98169b4271074c6e2585aa84"' : 'data-target="#xs-injectables-links-module-SpecialtiesModule-ed52762dfe62f9efd1862a5e228a4a0026e3f4098f2ebc0f7f8f3e6a6613040300ead897bfdb298f3cc81678b20b5036136bdb8b98169b4271074c6e2585aa84"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SpecialtiesModule-ed52762dfe62f9efd1862a5e228a4a0026e3f4098f2ebc0f7f8f3e6a6613040300ead897bfdb298f3cc81678b20b5036136bdb8b98169b4271074c6e2585aa84"' :
                                        'id="xs-injectables-links-module-SpecialtiesModule-ed52762dfe62f9efd1862a5e228a4a0026e3f4098f2ebc0f7f8f3e6a6613040300ead897bfdb298f3cc81678b20b5036136bdb8b98169b4271074c6e2585aa84"' }>
                                        <li class="link">
                                            <a href="injectables/SpecialtiesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecialtiesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestModule.html" data-type="entity-link" >TestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TestModule-b7b5381dfd572410fab52d2fc66616be8971c22db1c2e05db9ab7c7a3b9d73636d90cf30c40237a9ee86a88bb5b9d23c6dc74a611d4c29b1090ecdd19ba5bc11"' : 'data-target="#xs-controllers-links-module-TestModule-b7b5381dfd572410fab52d2fc66616be8971c22db1c2e05db9ab7c7a3b9d73636d90cf30c40237a9ee86a88bb5b9d23c6dc74a611d4c29b1090ecdd19ba5bc11"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TestModule-b7b5381dfd572410fab52d2fc66616be8971c22db1c2e05db9ab7c7a3b9d73636d90cf30c40237a9ee86a88bb5b9d23c6dc74a611d4c29b1090ecdd19ba5bc11"' :
                                            'id="xs-controllers-links-module-TestModule-b7b5381dfd572410fab52d2fc66616be8971c22db1c2e05db9ab7c7a3b9d73636d90cf30c40237a9ee86a88bb5b9d23c6dc74a611d4c29b1090ecdd19ba5bc11"' }>
                                            <li class="link">
                                                <a href="controllers/TestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TestModule-b7b5381dfd572410fab52d2fc66616be8971c22db1c2e05db9ab7c7a3b9d73636d90cf30c40237a9ee86a88bb5b9d23c6dc74a611d4c29b1090ecdd19ba5bc11"' : 'data-target="#xs-injectables-links-module-TestModule-b7b5381dfd572410fab52d2fc66616be8971c22db1c2e05db9ab7c7a3b9d73636d90cf30c40237a9ee86a88bb5b9d23c6dc74a611d4c29b1090ecdd19ba5bc11"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TestModule-b7b5381dfd572410fab52d2fc66616be8971c22db1c2e05db9ab7c7a3b9d73636d90cf30c40237a9ee86a88bb5b9d23c6dc74a611d4c29b1090ecdd19ba5bc11"' :
                                        'id="xs-injectables-links-module-TestModule-b7b5381dfd572410fab52d2fc66616be8971c22db1c2e05db9ab7c7a3b9d73636d90cf30c40237a9ee86a88bb5b9d23c6dc74a611d4c29b1090ecdd19ba5bc11"' }>
                                        <li class="link">
                                            <a href="injectables/TestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-24c28514dfb001ca55e57ada59053d1d6dfc0e9c674211ac78109d6ab050ef2ce843f096ab31452a1b172db01e3dd9b5b2d0b5fc6bdf46793bbe3988d812167b"' : 'data-target="#xs-controllers-links-module-UserModule-24c28514dfb001ca55e57ada59053d1d6dfc0e9c674211ac78109d6ab050ef2ce843f096ab31452a1b172db01e3dd9b5b2d0b5fc6bdf46793bbe3988d812167b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-24c28514dfb001ca55e57ada59053d1d6dfc0e9c674211ac78109d6ab050ef2ce843f096ab31452a1b172db01e3dd9b5b2d0b5fc6bdf46793bbe3988d812167b"' :
                                            'id="xs-controllers-links-module-UserModule-24c28514dfb001ca55e57ada59053d1d6dfc0e9c674211ac78109d6ab050ef2ce843f096ab31452a1b172db01e3dd9b5b2d0b5fc6bdf46793bbe3988d812167b"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-24c28514dfb001ca55e57ada59053d1d6dfc0e9c674211ac78109d6ab050ef2ce843f096ab31452a1b172db01e3dd9b5b2d0b5fc6bdf46793bbe3988d812167b"' : 'data-target="#xs-injectables-links-module-UserModule-24c28514dfb001ca55e57ada59053d1d6dfc0e9c674211ac78109d6ab050ef2ce843f096ab31452a1b172db01e3dd9b5b2d0b5fc6bdf46793bbe3988d812167b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-24c28514dfb001ca55e57ada59053d1d6dfc0e9c674211ac78109d6ab050ef2ce843f096ab31452a1b172db01e3dd9b5b2d0b5fc6bdf46793bbe3988d812167b"' :
                                        'id="xs-injectables-links-module-UserModule-24c28514dfb001ca55e57ada59053d1d6dfc0e9c674211ac78109d6ab050ef2ce843f096ab31452a1b172db01e3dd9b5b2d0b5fc6bdf46793bbe3988d812167b"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResultController.html" data-type="entity-link" >ResultController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SpecialtiesController.html" data-type="entity-link" >SpecialtiesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TestController.html" data-type="entity-link" >TestController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link" >ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResultDto.html" data-type="entity-link" >CreateResultDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSpecialtyDto.html" data-type="entity-link" >CreateSpecialtyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTestDto.html" data-type="entity-link" >CreateTestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDto.html" data-type="entity-link" >LoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Result.html" data-type="entity-link" >Result</a>
                            </li>
                            <li class="link">
                                <a href="classes/Specialty.html" data-type="entity-link" >Specialty</a>
                            </li>
                            <li class="link">
                                <a href="classes/Test.html" data-type="entity-link" >Test</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResultDto.html" data-type="entity-link" >UpdateResultDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSpecialtyDto.html" data-type="entity-link" >UpdateSpecialtyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTestDto.html" data-type="entity-link" >UpdateTestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResultService.html" data-type="entity-link" >ResultService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpecialtiesService.html" data-type="entity-link" >SpecialtiesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestService.html" data-type="entity-link" >TestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});