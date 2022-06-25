import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

export const routes: Route[] = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
