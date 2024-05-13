import { NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { of } from 'rxjs'

import { AppStateService, createTranslateLoader } from '@onecx/portal-integration-angular'
import { WorkspaceSnapshot } from 'src/app/shared/generated'
import { PreviewComponent } from './preview.component'

const snapshot: WorkspaceSnapshot = {
  workspaces: {
    workspace: {
      name: 'name',
      menu: {
        menu: {
          menuItems: [
            {
              name: 'name'
            },
            {
              name: 'name2'
            }
          ]
        }
      }
    }
  }
}

xdescribe('PreviewComponent', () => {
  let component: PreviewComponent
  let fixture: ComponentFixture<PreviewComponent>

  const themeServiceSpy = jasmine.createSpyObj('ThemeService', ['getThemes'])
  themeServiceSpy.getThemes.and.returnValue(
    of([
      { label: undefined, value: 'theme1' },
      { label: undefined, value: 'theme2' }
    ])
  )

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient, AppStateService]
          }
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
    themeServiceSpy.getThemes.calls.reset()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent)
    component = fixture.componentInstance
    component.importRequestDTO = snapshot
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  xit('should get themeNames from service', (done) => {
    themeServiceSpy.getThemes

    component.themes$.subscribe((themes) => {
      expect(themes).toEqual([
        { label: undefined, value: '' },
        { label: undefined, value: '' }
      ])
      done()
    })
  })

  it('should fillForm, addValidators to formGroup and call onModelChange OnChanges: import theme checkbox disabled', () => {
    spyOn(component, 'fillForm')
    spyOn(component, 'onModelChange')

    component.ngOnChanges()

    expect(component.fillForm).toHaveBeenCalled()
    expect(component.onModelChange).toHaveBeenCalled()
  })

  xit('should fillForm, addValidators to formGroup and call onModelChange OnChanges: import theme checkbox enabled', () => {
    spyOn(component, 'fillForm')
    spyOn(component, 'onModelChange')

    component.ngOnChanges()

    expect(component.fillForm).toHaveBeenCalled()
    expect(component.onModelChange).toHaveBeenCalled()
  })

  it('should fillForm correctly', () => {
    component.hasPermission = true
    component.fillForm()

    expect(component.formGroup.controls['workspaceName'].value).toEqual(
      component.importRequestDTO?.workspaces?.['workspace'].name
    )
    expect(component.formGroup.controls['baseUrl'].value).toEqual(
      component.importRequestDTO?.workspaces?.['workspace'].baseUrl
    )
  })

  it('should change values onModelChange', () => {
    component.hasPermission = true
    component.formGroup.controls['workspaceName'].setValue('new name')
    component.formGroup.controls['theme'].setValue('new theme')

    component.onModelChange()

    expect(component.workspaceName).toEqual(component.importRequestDTO?.workspaces?.['workspace'].name!)
    expect(component.workspaceName).toEqual(component.importRequestDTO?.workspaces?.['workspace'].theme!)
    expect(component.themeName).toEqual('theme')
  })

  it('should map menuItems to tree nodes: standard case', () => {
    component.ngOnInit()

    if (component.importRequestDTO?.workspaces?.['workspace'].menu?.menu?.menuItems) {
      expect(component.menuItems).toContain({
        label: 'name',
        expanded: false,
        key: undefined,
        leaf: true,
        children: []
      })
    }
  })

  it('should map menuItems to tree nodes: empty case', () => {
    if (!component.importRequestDTO) {
      component.importRequestDTO = {}
    }
    if (!component.importRequestDTO.workspaces) {
      component.importRequestDTO.workspaces = {}
    }
    if (!component.importRequestDTO.workspaces['workspace']) {
      component.importRequestDTO.workspaces['workspace'] = {}
    }
    if (!component.importRequestDTO.workspaces['workspace'].menu) {
      component.importRequestDTO.workspaces['workspace'].menu = {}
    }
    if (!component.importRequestDTO.workspaces['workspace'].menu.menu) {
      component.importRequestDTO.workspaces['workspace'].menu.menu = {}
    }
    component.importRequestDTO.workspaces['workspace'].menu.menu.menuItems = undefined

    component.ngOnInit()

    expect(component.menuItems).toEqual([])
  })

  it('should map menuItems to tree nodes: recursion case', () => {
    if (!component.importRequestDTO) {
      component.importRequestDTO = {}
    }
    if (!component.importRequestDTO.workspaces) {
      component.importRequestDTO.workspaces = {}
    }
    if (!component.importRequestDTO.workspaces['workspace']) {
      component.importRequestDTO.workspaces['workspace'] = {}
    }
    if (!component.importRequestDTO.workspaces['workspace'].menu) {
      component.importRequestDTO.workspaces['workspace'].menu = {}
    }
    if (!component.importRequestDTO.workspaces['workspace'].menu.menu) {
      component.importRequestDTO.workspaces['workspace'].menu.menu = {}
    }
    component.importRequestDTO.workspaces['workspace'].menu.menu.menuItems = [
      {
        name: 'menu',
        key: 'key',
        position: 1,
        disabled: true,
        external: true,
        children: [{ name: 'menu', key: 'key', position: 2, disabled: true, external: true }]
      }
    ]

    component.ngOnInit()

    if (component.importRequestDTO?.workspaces?.['workspace'].menu?.menu?.menuItems) {
      expect(component.menuItems).toContain({
        label: 'menu',
        expanded: false,
        key: 'key',
        leaf: false,
        children: [
          jasmine.objectContaining({
            label: 'menu',
            key: 'key',
            leaf: true
          })
        ]
      })
    }
  })
})
