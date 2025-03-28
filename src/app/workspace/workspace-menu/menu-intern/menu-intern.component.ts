import { Component, Input } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { WorkspaceMenuItem } from 'src/app/shared/generated'

@Component({
  selector: 'app-menu-intern',
  templateUrl: './menu-intern.component.html'
})
export class MenuInternComponent {
  @Input() menuItem: WorkspaceMenuItem | undefined
  @Input() dateFormat = 'M/d/yy, hh:mm:ss a'

  constructor(private readonly translate: TranslateService) {}
}
