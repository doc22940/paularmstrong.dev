(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{67:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(1),a=n(6),i=(n(0),n(81)),o={id:"git",title:"Git"},c={unversionedId:"protips/git",id:"protips/git",isDocsHomePage:!1,title:"Git",description:"main",source:"@site/pages/protips/git.md",slug:"/protips/git",permalink:"/pages/protips/git",version:"current",sidebar:"someSidebar",previous:{title:"ProTips",permalink:"/pages/protips/index"},next:{title:"About",permalink:"/pages/about"}},s=[{value:"<code>main</code>",id:"main",children:[{value:"<code>rmbranch</code>",id:"rmbranch",children:[]},{value:"<code>rebase</code>",id:"rebase",children:[]}]}],b={rightToc:s};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"main"},Object(i.b)("inlineCode",{parentName:"h2"},"main")),Object(i.b)("p",null,"Finds the default tracked (main) branch. Used to typically be ",Object(i.b)("inlineCode",{parentName:"p"},"master"),", but we are thankfully moving to ",Object(i.b)("inlineCode",{parentName:"p"},"main"),". This script can help remove the guessing game if you work with a bunch of repos."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"function main() {\n    DEFAULT_BRANCH=`git remote show origin | grep \"HEAD branch\" | sed 's/.*: //'`\n    git checkout $DEFAULT_BRANCH\n    git pull\n}\n")),Object(i.b)("h3",{id:"rmbranch"},Object(i.b)("inlineCode",{parentName:"h3"},"rmbranch")),Object(i.b)("p",null,"Deletes your current branch and moves to the default tracked branch."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"function rmbranch() {\n    BRANCH=`git rev-parse --abbrev-ref HEAD`\n    DEFAULT_BRANCH=`git remote show origin | grep \"HEAD branch\" | sed 's/.*: //'`\n    git checkout $DEFAULT_BRANCH\n    git branch -D $BRANCH\n    git pull\n}\n")),Object(i.b)("h3",{id:"rebase"},Object(i.b)("inlineCode",{parentName:"h3"},"rebase")),Object(i.b)("p",null,"Super helpful for workplaces that prefer flat commits and don't allow merge commits \u2013\xa0or you just find it easier to rebase. Quickly fetches your default branch and rebases on top of the latest changes."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"function rebase() {\n    DEFAULT_BRANCH=`git remote show origin | grep \"HEAD branch\" | sed 's/.*: //'`\n    git fetch origin $DEFAULT_BRANCH\n    git rebase origin/$DEFAULT_BRANCH\n}\n")))}p.isMDXComponent=!0}}]);