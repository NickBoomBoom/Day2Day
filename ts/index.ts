import fs from 'fs'
import { Project, Node, SyntaxKind } from 'ts-morph';
const content = fs.readFileSync('./component.ts', 'utf-8')

const project = new Project()

const sourceFile = project.createSourceFile(
  'dummyroutes.module.ts',
  content,
)

const d = 'HomeComponent'

// const node = sourceFile.getVariableDeclaration('routes');
// const initValue = node?.getInitializer();
// const imports = sourceFile.getImportDeclarations();
// if (Node.isArrayLiteralExpression(initValue)) {
//   const routes = initValue.getElements()[0];
//   if (Node.isObjectLiteralExpression(routes)) {
//     const childrenWrap = routes.getProperty('children');
//     if (Node.isPropertyAssignment(childrenWrap)) {
//       const children = childrenWrap.getInitializerIfKind(
//         SyntaxKind.ArrayLiteralExpression,
//       );
//       children?.getElements().forEach((t, i) => {
//         console.log(3333, t.getFullText())

//         if (t.getFullText().includes(d)) {
//           children.removeElement(i)
//         }
//       })
//     }
//   }
// }

// imports.forEach(t => {
//   if (t.getText().includes(d)) {
//     console.log(444)
//     t.remove()
//   }
// })

// console.log(sourceFile.getFullText())



const dd = sourceFile.getClass('RoutesRoutingModule')
const ddd =dd?.getDecorator('NgModule')?.getArguments()


ddd?.[0].forEachChild(t=> {
  t.getChildren()?.forEach(tt => {
      console.log(23333, tt.getText())
  });
})