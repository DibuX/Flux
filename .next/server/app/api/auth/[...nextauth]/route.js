/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n// Exportamos los handlers GET y POST para App Router\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFnQztBQUNRO0FBRXhDLHFEQUFxRDtBQUNyRCxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0Msa0RBQVdBO0FBRU0iLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmljb3JcXE9uZURyaXZlXFxFc2NyaXRvcmlvXFxOdWV2byBGbHV4XFxmbHV4LWVjb21tZXJjZVxcYXBwXFxhcGlcXGF1dGhcXFsuLi5uZXh0YXV0aF1cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCJcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiXHJcblxyXG4vLyBFeHBvcnRhbW9zIGxvcyBoYW5kbGVycyBHRVQgeSBQT1NUIHBhcmEgQXBwIFJvdXRlclxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _lib_db_mysql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db/mysql */ \"(rsc)/./lib/db/mysql.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                try {\n                    const users = await (0,_lib_db_mysql__WEBPACK_IMPORTED_MODULE_2__.executeQuery)(`SELECT id_usuario, nombre, apellido, email, contraseña, fecha_registro, ultimo_login, activo, emailVerified\n             FROM usuarios\n             WHERE email = ?`, [\n                        credentials.email\n                    ]);\n                    if (users.length === 0) {\n                        return null;\n                    }\n                    const userFromDB = users[0];\n                    if (!userFromDB.activo) {\n                        throw new Error(\"Esta cuenta ha sido desactivada\");\n                    }\n                    const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].compare(credentials.password, userFromDB.contraseña);\n                    if (!isPasswordValid) {\n                        return null;\n                    }\n                    return {\n                        id: userFromDB.id_usuario.toString(),\n                        name: `${userFromDB.nombre} ${userFromDB.apellido}`,\n                        email: userFromDB.email,\n                        emailVerified: userFromDB.emailVerified\n                    };\n                } catch (error) {\n                    console.error(\"Error en autenticación:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    pages: {\n        signIn: \"/login\",\n        signOut: \"/logout\",\n        error: \"/login\"\n    },\n    jwt: {\n        // Use secure encryption for JWT tokens\n        maxAge: 30 * 24 * 60 * 60\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.email = user.email;\n                token.name = user.name;\n                token.emailVerified = user.emailVerified;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n                session.user.email = token.email;\n                session.user.name = token.name;\n                session.user.emailVerified = token.emailVerified;\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    debug: \"development\" === \"development\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWlFO0FBRXBDO0FBQ2dCO0FBRXRDLE1BQU1HLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1RKLDJFQUFtQkEsQ0FBQztZQUNsQkssTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxPQUFPO2dCQUNUO2dCQUVBLElBQUk7b0JBQ0YsTUFBTUUsUUFBUSxNQUFNViwyREFBWUEsQ0FDOUIsQ0FBQzs7NEJBRWUsQ0FBQyxFQUNqQjt3QkFBQ0ksWUFBWUMsS0FBSztxQkFBQztvQkFHckIsSUFBSUssTUFBTUMsTUFBTSxLQUFLLEdBQUc7d0JBQ3RCLE9BQU87b0JBQ1Q7b0JBRUEsTUFBTUMsYUFBYUYsS0FBSyxDQUFDLEVBQUU7b0JBRTNCLElBQUksQ0FBQ0UsV0FBV0MsTUFBTSxFQUFFO3dCQUN0QixNQUFNLElBQUlDLE1BQU07b0JBQ2xCO29CQUVBLE1BQU1DLGtCQUFrQixNQUFNaEIsd0RBQWMsQ0FBQ0ssWUFBWUksUUFBUSxFQUFFSSxXQUFXSyxVQUFVO29CQUV4RixJQUFJLENBQUNGLGlCQUFpQjt3QkFDcEIsT0FBTztvQkFDVDtvQkFFQSxPQUFPO3dCQUNMRyxJQUFJTixXQUFXTyxVQUFVLENBQUNDLFFBQVE7d0JBQ2xDakIsTUFBTSxHQUFHUyxXQUFXUyxNQUFNLENBQUMsQ0FBQyxFQUFFVCxXQUFXVSxRQUFRLEVBQUU7d0JBQ25EakIsT0FBT08sV0FBV1AsS0FBSzt3QkFDdkJrQixlQUFlWCxXQUFXVyxhQUFhO29CQUN6QztnQkFDRixFQUFFLE9BQU9DLE9BQU87b0JBQ2RDLFFBQVFELEtBQUssQ0FBQywyQkFBMkJBO29CQUN6QyxPQUFPO2dCQUNUO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RFLE9BQU87UUFDTEMsUUFBUTtRQUNSQyxTQUFTO1FBQ1RKLE9BQU87SUFDVDtJQUNBSyxLQUFLO1FBQ0gsdUNBQXVDO1FBQ3ZDQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0lBQ0FDLFNBQVM7UUFDUEMsVUFBVTtRQUNWRixRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0lBQ0FHLFdBQVc7UUFDVCxNQUFNSixLQUFJLEVBQUVLLEtBQUssRUFBRUMsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JELE1BQU1oQixFQUFFLEdBQUdpQixLQUFLakIsRUFBRTtnQkFDbEJnQixNQUFNN0IsS0FBSyxHQUFHOEIsS0FBSzlCLEtBQUs7Z0JBQ3hCNkIsTUFBTS9CLElBQUksR0FBR2dDLEtBQUtoQyxJQUFJO2dCQUN0QitCLE1BQU1YLGFBQWEsR0FBRyxLQUFjQSxhQUFhO1lBQ25EO1lBQ0EsT0FBT1c7UUFDVDtRQUNBLE1BQU1ILFNBQVEsRUFBRUEsT0FBTyxFQUFFRyxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsU0FBU0gsUUFBUUksSUFBSSxFQUFFO2dCQUN6QkosUUFBUUksSUFBSSxDQUFDakIsRUFBRSxHQUFHZ0IsTUFBTWhCLEVBQUU7Z0JBQzFCYSxRQUFRSSxJQUFJLENBQUM5QixLQUFLLEdBQUc2QixNQUFNN0IsS0FBSztnQkFDaEMwQixRQUFRSSxJQUFJLENBQUNoQyxJQUFJLEdBQUcrQixNQUFNL0IsSUFBSTtnQkFDOUI0QixRQUFRSSxJQUFJLENBQUNaLGFBQWEsR0FBRyxNQUFlQSxhQUFhO1lBQzNEO1lBQ0EsT0FBT1E7UUFDVDtJQUNGO0lBQ0FLLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtJQUNuQ0MsT0FBT0gsa0JBQXlCO0FBQ2xDLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmljb3JcXE9uZURyaXZlXFxFc2NyaXRvcmlvXFxOdWV2byBGbHV4XFxmbHV4LWVjb21tZXJjZVxcbGliXFxhdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcclxuaW1wb3J0IHR5cGUgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCJcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIlxyXG5pbXBvcnQgeyBleGVjdXRlUXVlcnkgfSBmcm9tIFwiQC9saWIvZGIvbXlzcWxcIlxyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcclxuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgZXhlY3V0ZVF1ZXJ5KFxyXG4gICAgICAgICAgICBgU0VMRUNUIGlkX3VzdWFyaW8sIG5vbWJyZSwgYXBlbGxpZG8sIGVtYWlsLCBjb250cmFzZcOxYSwgZmVjaGFfcmVnaXN0cm8sIHVsdGltb19sb2dpbiwgYWN0aXZvLCBlbWFpbFZlcmlmaWVkXHJcbiAgICAgICAgICAgICBGUk9NIHVzdWFyaW9zXHJcbiAgICAgICAgICAgICBXSEVSRSBlbWFpbCA9ID9gLFxyXG4gICAgICAgICAgICBbY3JlZGVudGlhbHMuZW1haWxdLFxyXG4gICAgICAgICAgKVxyXG5cclxuICAgICAgICAgIGlmICh1c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCB1c2VyRnJvbURCID0gdXNlcnNbMF0gYXMgYW55XHJcblxyXG4gICAgICAgICAgaWYgKCF1c2VyRnJvbURCLmFjdGl2bykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFc3RhIGN1ZW50YSBoYSBzaWRvIGRlc2FjdGl2YWRhXCIpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXJGcm9tREIuY29udHJhc2XDsWEpXHJcblxyXG4gICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogdXNlckZyb21EQi5pZF91c3VhcmlvLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIG5hbWU6IGAke3VzZXJGcm9tREIubm9tYnJlfSAke3VzZXJGcm9tREIuYXBlbGxpZG99YCxcclxuICAgICAgICAgICAgZW1haWw6IHVzZXJGcm9tREIuZW1haWwsXHJcbiAgICAgICAgICAgIGVtYWlsVmVyaWZpZWQ6IHVzZXJGcm9tREIuZW1haWxWZXJpZmllZCxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVuIGF1dGVudGljYWNpw7NuOlwiLCBlcnJvcilcclxuICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiBcIi9sb2dpblwiLFxyXG4gICAgc2lnbk91dDogXCIvbG9nb3V0XCIsXHJcbiAgICBlcnJvcjogXCIvbG9naW5cIixcclxuICB9LFxyXG4gIGp3dDoge1xyXG4gICAgLy8gVXNlIHNlY3VyZSBlbmNyeXB0aW9uIGZvciBKV1QgdG9rZW5zXHJcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXHJcbiAgfSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIixcclxuICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRheXNcclxuICB9LFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxyXG4gICAgICAgIHRva2VuLmVtYWlsID0gdXNlci5lbWFpbFxyXG4gICAgICAgIHRva2VuLm5hbWUgPSB1c2VyLm5hbWVcclxuICAgICAgICB0b2tlbi5lbWFpbFZlcmlmaWVkID0gKHVzZXIgYXMgYW55KS5lbWFpbFZlcmlmaWVkXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHRva2VuICYmIHNlc3Npb24udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkIGFzIHN0cmluZ1xyXG4gICAgICAgIHNlc3Npb24udXNlci5lbWFpbCA9IHRva2VuLmVtYWlsXHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLm5hbWUgPSB0b2tlbi5uYW1lIGFzIHN0cmluZ1xyXG4gICAgICAgIHNlc3Npb24udXNlci5lbWFpbFZlcmlmaWVkID0gKHRva2VuIGFzIGFueSkuZW1haWxWZXJpZmllZFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXHJcbiAgZGVidWc6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIsXHJcbn1cclxuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJleGVjdXRlUXVlcnkiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VycyIsImxlbmd0aCIsInVzZXJGcm9tREIiLCJhY3Rpdm8iLCJFcnJvciIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJjb250cmFzZcOxYSIsImlkIiwiaWRfdXN1YXJpbyIsInRvU3RyaW5nIiwibm9tYnJlIiwiYXBlbGxpZG8iLCJlbWFpbFZlcmlmaWVkIiwiZXJyb3IiLCJjb25zb2xlIiwicGFnZXMiLCJzaWduSW4iLCJzaWduT3V0Iiwiand0IiwibWF4QWdlIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiY2FsbGJhY2tzIiwidG9rZW4iLCJ1c2VyIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCIsImRlYnVnIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db/mysql.ts":
/*!*************************!*\
  !*** ./lib/db/mysql.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   executeQuery: () => (/* binding */ executeQuery),\n/* harmony export */   executeTransaction: () => (/* binding */ executeTransaction)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n/* harmony import */ var server_only__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! server-only */ \"(rsc)/./node_modules/next/dist/compiled/server-only/empty.js\");\n/* harmony import */ var server_only__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(server_only__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Configuración de la conexión a MySQL\nconst dbConfig = {\n    host: process.env.MYSQL_HOST || \"localhost\",\n    user: process.env.MYSQL_USER || \"root\",\n    password: process.env.MYSQL_PASSWORD || \"12345678\",\n    database: process.env.MYSQL_DATABASE || \"flux\",\n    port: Number(process.env.DB_PORT) || 3306,\n    waitForConnections: true,\n    connectionLimit: 10,\n    queueLimit: 0\n};\n// Pool de conexiones para mejor rendimiento\nlet pool;\n// Inicializar el pool de conexiones\nfunction getPool() {\n    if (!pool) {\n        pool = mysql2_promise__WEBPACK_IMPORTED_MODULE_0__.createPool(dbConfig);\n    }\n    return pool;\n}\n// Función para ejecutar consultas SQL\nasync function executeQuery(query, params = []) {\n    try {\n        const pool = getPool();\n        const [rows] = await pool.query(query, params);\n        return rows;\n    } catch (error) {\n        console.error(\"Error al ejecutar la consulta:\", error);\n        throw new Error(\"Error al ejecutar la consulta en la base de datos\");\n    }\n}\n// Función para ejecutar una transacción\nasync function executeTransaction(callback) {\n    const pool = getPool();\n    const connection = await pool.getConnection();\n    try {\n        await connection.beginTransaction();\n        const result = await callback(connection);\n        await connection.commit();\n        return result;\n    } catch (error) {\n        await connection.rollback();\n        console.error(\"Error en la transacción:\", error);\n        throw error;\n    } finally{\n        connection.release();\n    }\n}\nconst db = getPool();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIvbXlzcWwudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWtDO0FBQ2Q7QUFFcEIsdUNBQXVDO0FBQ3ZDLE1BQU1DLFdBQVc7SUFDZkMsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLElBQUk7SUFDaENDLE1BQU1ILFFBQVFDLEdBQUcsQ0FBQ0csVUFBVSxJQUFJO0lBQ2hDQyxVQUFVTCxRQUFRQyxHQUFHLENBQUNLLGNBQWMsSUFBSTtJQUN4Q0MsVUFBVVAsUUFBUUMsR0FBRyxDQUFDTyxjQUFjLElBQUk7SUFDeENDLE1BQU1DLE9BQU9WLFFBQVFDLEdBQUcsQ0FBQ1UsT0FBTyxLQUFLO0lBQ3JDQyxvQkFBb0I7SUFDcEJDLGlCQUFpQjtJQUNqQkMsWUFBWTtBQUNkO0FBRUEsNENBQTRDO0FBQzVDLElBQUlDO0FBRUosb0NBQW9DO0FBQ3BDLFNBQVNDO0lBQ1AsSUFBSSxDQUFDRCxNQUFNO1FBQ1RBLE9BQU9sQixzREFBZ0IsQ0FBQ0M7SUFDMUI7SUFDQSxPQUFPaUI7QUFDVDtBQUVBLHNDQUFzQztBQUMvQixlQUFlRyxhQUFnQkMsS0FBYSxFQUFFQyxTQUFnQixFQUFFO0lBQ3JFLElBQUk7UUFDRixNQUFNTCxPQUFPQztRQUNiLE1BQU0sQ0FBQ0ssS0FBSyxHQUFHLE1BQU1OLEtBQUtJLEtBQUssQ0FBQ0EsT0FBT0M7UUFDdkMsT0FBT0M7SUFDVCxFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGtDQUFrQ0E7UUFDaEQsTUFBTSxJQUFJRSxNQUFNO0lBQ2xCO0FBQ0Y7QUFFQSx3Q0FBd0M7QUFDakMsZUFBZUMsbUJBQXNCQyxRQUEwRDtJQUNwRyxNQUFNWCxPQUFPQztJQUNiLE1BQU1XLGFBQWEsTUFBTVosS0FBS2EsYUFBYTtJQUUzQyxJQUFJO1FBQ0YsTUFBTUQsV0FBV0UsZ0JBQWdCO1FBQ2pDLE1BQU1DLFNBQVMsTUFBTUosU0FBU0M7UUFDOUIsTUFBTUEsV0FBV0ksTUFBTTtRQUN2QixPQUFPRDtJQUNULEVBQUUsT0FBT1IsT0FBTztRQUNkLE1BQU1LLFdBQVdLLFFBQVE7UUFDekJULFFBQVFELEtBQUssQ0FBQyw0QkFBNEJBO1FBQzFDLE1BQU1BO0lBQ1IsU0FBVTtRQUNSSyxXQUFXTSxPQUFPO0lBQ3BCO0FBQ0Y7QUFFQSxNQUFNQyxLQUFLbEI7QUFDRSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxuaWNvclxcT25lRHJpdmVcXEVzY3JpdG9yaW9cXE51ZXZvIEZsdXhcXGZsdXgtZWNvbW1lcmNlXFxsaWJcXGRiXFxteXNxbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbXlzcWwgZnJvbSBcIm15c3FsMi9wcm9taXNlXCJcclxuaW1wb3J0IFwic2VydmVyLW9ubHlcIlxyXG5cclxuLy8gQ29uZmlndXJhY2nDs24gZGUgbGEgY29uZXhpw7NuIGEgTXlTUUxcclxuY29uc3QgZGJDb25maWcgPSB7XHJcbiAgaG9zdDogcHJvY2Vzcy5lbnYuTVlTUUxfSE9TVCB8fCBcImxvY2FsaG9zdFwiLFxyXG4gIHVzZXI6IHByb2Nlc3MuZW52Lk1ZU1FMX1VTRVIgfHwgXCJyb290XCIsXHJcbiAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52Lk1ZU1FMX1BBU1NXT1JEIHx8IFwiMTIzNDU2NzhcIixcclxuICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuTVlTUUxfREFUQUJBU0UgfHwgXCJmbHV4XCIsXHJcbiAgcG9ydDogTnVtYmVyKHByb2Nlc3MuZW52LkRCX1BPUlQpIHx8IDMzMDYsXHJcbiAgd2FpdEZvckNvbm5lY3Rpb25zOiB0cnVlLFxyXG4gIGNvbm5lY3Rpb25MaW1pdDogMTAsXHJcbiAgcXVldWVMaW1pdDogMCxcclxufVxyXG5cclxuLy8gUG9vbCBkZSBjb25leGlvbmVzIHBhcmEgbWVqb3IgcmVuZGltaWVudG9cclxubGV0IHBvb2w6IG15c3FsLlBvb2xcclxuXHJcbi8vIEluaWNpYWxpemFyIGVsIHBvb2wgZGUgY29uZXhpb25lc1xyXG5mdW5jdGlvbiBnZXRQb29sKCkge1xyXG4gIGlmICghcG9vbCkge1xyXG4gICAgcG9vbCA9IG15c3FsLmNyZWF0ZVBvb2woZGJDb25maWcpXHJcbiAgfVxyXG4gIHJldHVybiBwb29sXHJcbn1cclxuXHJcbi8vIEZ1bmNpw7NuIHBhcmEgZWplY3V0YXIgY29uc3VsdGFzIFNRTFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVF1ZXJ5PFQ+KHF1ZXJ5OiBzdHJpbmcsIHBhcmFtczogYW55W10gPSBbXSk6IFByb21pc2U8VFtdPiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHBvb2wgPSBnZXRQb29sKClcclxuICAgIGNvbnN0IFtyb3dzXSA9IGF3YWl0IHBvb2wucXVlcnkocXVlcnksIHBhcmFtcylcclxuICAgIHJldHVybiByb3dzIGFzIFRbXVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWwgZWplY3V0YXIgbGEgY29uc3VsdGE6XCIsIGVycm9yKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgYWwgZWplY3V0YXIgbGEgY29uc3VsdGEgZW4gbGEgYmFzZSBkZSBkYXRvc1wiKVxyXG4gIH1cclxufVxyXG5cclxuLy8gRnVuY2nDs24gcGFyYSBlamVjdXRhciB1bmEgdHJhbnNhY2Npw7NuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlVHJhbnNhY3Rpb248VD4oY2FsbGJhY2s6IChjb25uZWN0aW9uOiBteXNxbC5Qb29sQ29ubmVjdGlvbikgPT4gUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xyXG4gIGNvbnN0IHBvb2wgPSBnZXRQb29sKClcclxuICBjb25zdCBjb25uZWN0aW9uID0gYXdhaXQgcG9vbC5nZXRDb25uZWN0aW9uKClcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGNvbm5lY3Rpb24uYmVnaW5UcmFuc2FjdGlvbigpXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWxsYmFjayhjb25uZWN0aW9uKVxyXG4gICAgYXdhaXQgY29ubmVjdGlvbi5jb21taXQoKVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBhd2FpdCBjb25uZWN0aW9uLnJvbGxiYWNrKClcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBlbiBsYSB0cmFuc2FjY2nDs246XCIsIGVycm9yKVxyXG4gICAgdGhyb3cgZXJyb3JcclxuICB9IGZpbmFsbHkge1xyXG4gICAgY29ubmVjdGlvbi5yZWxlYXNlKClcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGRiID0gZ2V0UG9vbCgpXHJcbmV4cG9ydCB7IGRiIH1cclxuIl0sIm5hbWVzIjpbIm15c3FsIiwiZGJDb25maWciLCJob3N0IiwicHJvY2VzcyIsImVudiIsIk1ZU1FMX0hPU1QiLCJ1c2VyIiwiTVlTUUxfVVNFUiIsInBhc3N3b3JkIiwiTVlTUUxfUEFTU1dPUkQiLCJkYXRhYmFzZSIsIk1ZU1FMX0RBVEFCQVNFIiwicG9ydCIsIk51bWJlciIsIkRCX1BPUlQiLCJ3YWl0Rm9yQ29ubmVjdGlvbnMiLCJjb25uZWN0aW9uTGltaXQiLCJxdWV1ZUxpbWl0IiwicG9vbCIsImdldFBvb2wiLCJjcmVhdGVQb29sIiwiZXhlY3V0ZVF1ZXJ5IiwicXVlcnkiLCJwYXJhbXMiLCJyb3dzIiwiZXJyb3IiLCJjb25zb2xlIiwiRXJyb3IiLCJleGVjdXRlVHJhbnNhY3Rpb24iLCJjYWxsYmFjayIsImNvbm5lY3Rpb24iLCJnZXRDb25uZWN0aW9uIiwiYmVnaW5UcmFuc2FjdGlvbiIsInJlc3VsdCIsImNvbW1pdCIsInJvbGxiYWNrIiwicmVsZWFzZSIsImRiIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db/mysql.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$":
/*!****************************************************!*\
  !*** ./node_modules/mysql2/lib/ sync ^cardinal.*$ ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cnicor%5COneDrive%5CEscritorio%5CNuevo%20Flux%5Cflux-ecommerce%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnicor%5COneDrive%5CEscritorio%5CNuevo%20Flux%5Cflux-ecommerce&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cnicor%5COneDrive%5CEscritorio%5CNuevo%20Flux%5Cflux-ecommerce%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnicor%5COneDrive%5CEscritorio%5CNuevo%20Flux%5Cflux-ecommerce&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_nicor_OneDrive_Escritorio_Nuevo_Flux_flux_ecommerce_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\nicor\\\\OneDrive\\\\Escritorio\\\\Nuevo Flux\\\\flux-ecommerce\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_nicor_OneDrive_Escritorio_Nuevo_Flux_flux_ecommerce_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNuaWNvciU1Q09uZURyaXZlJTVDRXNjcml0b3JpbyU1Q051ZXZvJTIwRmx1eCU1Q2ZsdXgtZWNvbW1lcmNlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNuaWNvciU1Q09uZURyaXZlJTVDRXNjcml0b3JpbyU1Q051ZXZvJTIwRmx1eCU1Q2ZsdXgtZWNvbW1lcmNlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMyRDtBQUN4STtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcbmljb3JcXFxcT25lRHJpdmVcXFxcRXNjcml0b3Jpb1xcXFxOdWV2byBGbHV4XFxcXGZsdXgtZWNvbW1lcmNlXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG5pY29yXFxcXE9uZURyaXZlXFxcXEVzY3JpdG9yaW9cXFxcTnVldm8gRmx1eFxcXFxmbHV4LWVjb21tZXJjZVxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cnicor%5COneDrive%5CEscritorio%5CNuevo%20Flux%5Cflux-ecommerce%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnicor%5COneDrive%5CEscritorio%5CNuevo%20Flux%5Cflux-ecommerce&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cnicor%5COneDrive%5CEscritorio%5CNuevo%20Flux%5Cflux-ecommerce%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnicor%5COneDrive%5CEscritorio%5CNuevo%20Flux%5Cflux-ecommerce&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();