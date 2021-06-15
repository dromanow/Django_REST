(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{35:function(t,e,n){},36:function(t,e,n){},64:function(t,e,n){"use strict";n.r(e);var o=n(1),a=n.n(o),r=n(29),c=n.n(r),s=(n(35),n(10)),i=n(11),u=n(13),h=n(12),l=(n(36),n(8)),j=n(0),b=function(t){var e=t.author;return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:e.id}),Object(j.jsx)("td",{children:Object(j.jsx)(l.b,{to:"/author/".concat(e.id),children:e.first_name})}),Object(j.jsx)("td",{children:Object(j.jsx)(l.b,{to:"/author/".concat(e.id),children:e.last_name})}),Object(j.jsx)("td",{children:e.birthday_year})]})},d=function(t){var e=t.authors;return Object(j.jsxs)("table",{children:[Object(j.jsx)("th",{children:"Id"}),Object(j.jsx)("th",{children:"First name"}),Object(j.jsx)("th",{children:"Last name"}),Object(j.jsx)("th",{children:"Birthday year"}),e.map((function(t){return Object(j.jsx)(b,{author:t})}))]})},O=n(2),f=function(t){var e=t.authors,n=Object(O.g)().id,o=e.find((function(t){return t.id==n}));return Object(j.jsxs)("div",{children:[o.name,o.birthday_year]})},p=function(t){var e=t.book,n=t.delete_book;return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:e.id}),Object(j.jsx)("td",{children:e.name}),Object(j.jsx)("td",{children:e.authors}),Object(j.jsx)("td",{children:Object(j.jsx)("button",{onClick:function(){return n(e.id)},children:"Delete"})})]})},x=function(t){var e=t.books,n=t.delete_book;return Object(j.jsxs)("table",{children:[Object(j.jsx)("th",{children:"Id"}),Object(j.jsx)("th",{children:"Name"}),Object(j.jsx)("th",{children:"Authors"}),Object(j.jsx)("th",{}),e.map((function(t){return Object(j.jsx)(p,{book:t,delete_book:n})}))]})},k=n(16),v=function(t){Object(u.a)(n,t);var e=Object(h.a)(n);function n(t){var o;return Object(s.a)(this,n),(o=e.call(this,t)).state={login:"",password:""},o}return Object(i.a)(n,[{key:"handleChange",value:function(t){this.setState(Object(k.a)({},t.target.name,t.target.value))}},{key:"handleSubmit",value:function(t){this.props.get_token(this.state.login,this.state.password),t.preventDefault()}},{key:"render",value:function(){var t=this;return Object(j.jsxs)("form",{onSubmit:function(e){return t.handleSubmit(e)},children:[Object(j.jsx)("input",{type:"text",name:"login",placeholder:"login",value:this.state.login,onChange:function(e){return t.handleChange(e)}}),Object(j.jsx)("input",{type:"password",name:"password",placeholder:"password",value:this.state.password,onChange:function(e){return t.handleChange(e)}}),Object(j.jsx)("input",{type:"submit",value:"Login"})]})}}]),n}(a.a.Component),g=function(t){Object(u.a)(n,t);var e=Object(h.a)(n);function n(t){var o;return Object(s.a)(this,n),(o=e.call(this,t)).state={name:"",authors:[]},o}return Object(i.a)(n,[{key:"handleChange",value:function(t){this.setState(Object(k.a)({},t.target.name,t.target.value))}},{key:"handleChangeAuthors",value:function(t){if(t.target.selectedOptions){for(var e=[],n=0;n<t.target.selectedOptions.length;n++)e.push(t.target.selectedOptions.item(n).value);console.log(e),this.setState({authors:e})}}},{key:"handleSubmit",value:function(t){this.props.create_book(this.state.name,this.state.authors),t.preventDefault()}},{key:"render",value:function(){var t=this;return Object(j.jsxs)("form",{onSubmit:function(e){return t.handleSubmit(e)},children:[Object(j.jsx)("input",{type:"text",name:"name",placeholder:"name",value:this.state.name,onChange:function(e){return t.handleChange(e)}}),Object(j.jsx)("select",{multiple:!0,name:"authors",className:"form-control",onChange:function(e){return t.handleChangeAuthors(e)},children:this.props.authors.map((function(t){return Object(j.jsx)("option",{value:t.id,children:t.last_name})}))}),Object(j.jsx)("input",{type:"submit",value:"Create"})]})}}]),n}(a.a.Component),m=n(14),_=n.n(m),y=function(t){var e=t.location;return Object(j.jsxs)("div",{children:["Not found: ",e.pathname]})},S=function(t){Object(u.a)(n,t);var e=Object(h.a)(n);function n(t){var o;return Object(s.a)(this,n),(o=e.call(this,t)).state={authors:[],books:[],token:""},o}return Object(i.a)(n,[{key:"restore_token",value:function(){var t=localStorage.getItem("token");this.setState({token:t},this.load_data)}},{key:"create_header",value:function(){return this.is_auth()?{Authorization:"Token "+this.state.token}:{}}},{key:"load_data",value:function(){var t=this,e=this.create_header();_.a.get("http://127.0.0.1:8000/api/authors/",{headers:e}).then((function(e){var n=e.data;t.setState({authors:n})})).catch((function(t){return console.log(t)})),_.a.get("http://127.0.0.1:8000/api/books/",{headers:e}).then((function(e){var n=e.data;t.setState({books:n})})).catch((function(e){t.setState({books:[]}),console.log(e)}))}},{key:"componentDidMount",value:function(){this.restore_token()}},{key:"is_auth",value:function(){return!!this.state.token}},{key:"logout",value:function(){localStorage.removeItem("token"),this.setState({token:""},this.load_data)}},{key:"get_token",value:function(t,e){var n=this;_.a.post("http://127.0.0.1:8000/api-token-auth/",{username:t,password:e}).then((function(t){localStorage.setItem("token",t.data.token),n.setState({token:t.data.token},n.load_data)})).catch((function(t){return alert("Wrong password")}))}},{key:"delete_book",value:function(t){var e=this,n=this.create_header();_.a.delete("http://127.0.0.1:8000/api/books/".concat(t,"/"),{headers:n}).then((function(n){e.setState({books:e.state.books.filter((function(e){return e.id!==t}))})})).catch((function(t){console.log(t)}))}},{key:"create_book",value:function(t,e){var n=this;console.log("create_book "+t+" - "+e),console.log(e),_.a.post("http://127.0.0.1:8000/api/books/",{name:t,authors:e}).then((function(t){n.load_data()})).catch((function(t){return console.log("Wrong password")}))}},{key:"render",value:function(){var t=this;return Object(j.jsx)("div",{children:Object(j.jsxs)(l.a,{children:[Object(j.jsx)("nav",{children:Object(j.jsxs)("ul",{children:[Object(j.jsx)("li",{children:Object(j.jsx)(l.b,{to:"/",children:"Authors"})}),Object(j.jsx)("li",{children:Object(j.jsx)(l.b,{to:"/books",children:"Books"})}),Object(j.jsx)("li",{children:Object(j.jsx)(l.b,{to:"/books/create",children:"New book"})}),Object(j.jsx)("li",{children:this.is_auth()?Object(j.jsx)("button",{onClick:function(){return t.logout()},children:"Logout"}):Object(j.jsx)(l.b,{to:"/login",children:"Login"})})]})}),Object(j.jsxs)(O.d,{children:[Object(j.jsx)(O.b,{exact:!0,path:"/",component:function(){return Object(j.jsx)(d,{authors:t.state.authors})}}),Object(j.jsx)(O.b,{exact:!0,path:"/books",component:function(){return Object(j.jsx)(x,{books:t.state.books,delete_book:function(e){return t.delete_book(e)}})}}),Object(j.jsx)(O.b,{exact:!0,path:"/login",component:function(){return Object(j.jsx)(v,{get_token:function(e,n){return t.get_token(e,n)}})}}),Object(j.jsx)(O.b,{exact:!0,path:"/books/create",component:function(){return Object(j.jsx)(g,{create_book:function(e,n){return t.create_book(e,n)},authors:t.state.authors})}}),Object(j.jsx)(O.b,{exact:!0,path:"/author/:id",component:function(){return Object(j.jsx)(f,{authors:t.state.authors})}}),Object(j.jsx)(O.a,{from:"/authors",to:"/"}),Object(j.jsx)(O.b,{component:y})]})]})})}}]),n}(a.a.Component),C=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,65)).then((function(e){var n=e.getCLS,o=e.getFID,a=e.getFCP,r=e.getLCP,c=e.getTTFB;n(t),o(t),a(t),r(t),c(t)}))};c.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(S,{})}),document.getElementById("root")),C()}},[[64,1,2]]]);
//# sourceMappingURL=main.a3d18101.chunk.js.map