import { replaceDependencies } from '../../src';
import { IImportType, IParsedConfigItem } from '../../src/ast/types';


describe('replaceDependencies', () => {
  const parsedConfigList: IParsedConfigItem[] = [
    {
      source: 'old-module',
      target: 'new-module',
      sourceName: 'OldComponent',
      sourceType: IImportType.ImportSpecifier,
      targetName: 'NewComponent',
      targetType: IImportType.ImportSpecifier,
    },
    {
      source: 'another-old-module',
      target: 'another-new-module',
      sourceName: '', // 无用
      sourceType: IImportType.ImportDefaultSpecifier,
      targetName: 'AnotherComponent',
      targetType: IImportType.ImportDefaultSpecifier,
    },
  ];

  it('should replace imports with new module and specifier', () => {
    const content = `
      import { OldComponent } from 'old-module';
import AnotherComponent from 'another-old-module';
    `;

    const expected = `
      import { NewComponent as OldComponent } from "new-module";
import AnotherComponent from "another-new-module";
    `;

    const result = replaceDependencies(content, parsedConfigList, '@tx/pmd-vue');
    expect(result.trim()).toEqual(expected.trim());
  });

  it('should not replace imports that do not match the config', () => {
    const content = `
      import { SomeComponent } from 'unrelated-module';
    `;

    const expected = content;

    const result = replaceDependencies(content, parsedConfigList, '@tx/pmd-vue');
    expect(result.trim()).toEqual(expected.trim());
  });

  it('should not replace imports that contain the keyword', () => {
    const content = `
      import { OldComponent } from '@tx/pmd-vue/old-module';
    `;

    const expected = content;

    const result = replaceDependencies(content, parsedConfigList, '@tx/pmd-vue');
    expect(result.trim()).toEqual(expected.trim());
  });

  it('should handle multiple imports from the same module', () => {
    const content = `
      import { OldComponent1, OldComponent2 } from 'old-module';
    `;

    const expected = `
      import { OldComponent1, OldComponent2 } from 'old-module';
    `;

    const result = replaceDependencies(content, parsedConfigList, '@tx/pmd-vue');
    expect(result.trim()).toEqual(expected.trim());
  });

  it('should return the original content if no replacements are made', () => {
    const content = `
      import { SomeComponent } from 'unrelated-module';
    `;

    const expected = content;

    const result = replaceDependencies(content, parsedConfigList, '@tx/pmd-vue');
    expect(result.trim()).toEqual(expected.trim());
  });

  it('should replace default imports correctly', () => {
    const content = `
      import OldDefault from 'old-module';
    `;

    const parsedConfigList = [{
      source: 'old-module',
      target: 'new-module',
      sourceType: IImportType.ImportDefaultSpecifier,
      sourceName: '',
      targetName: 'NewDefault',
      targetType: IImportType.ImportDefaultSpecifier,
    }];

    const expected = `
      import OldDefault from "new-module";
    `;

    const result = replaceDependencies(content, parsedConfigList, '@tx/pmd-vue');
    expect(result.trim()).toEqual(expected.trim());
  });

  it('should replace namespace imports correctly', () => {
    const content = `
      import * as OldNamespace from 'old-module';
    `;

    const parsedConfigList = [{
      source: 'old-module',
      target: 'new-module',
      sourceName: '',
      sourceType: IImportType.importNamespaceSpecifier,
      targetName: '',
      targetType: IImportType.importNamespaceSpecifier,
    }];

    const expected = `
      import * as OldNamespace from "new-module";
    `;

    const result = replaceDependencies(content, parsedConfigList, '@tx/pmd-vue');
    expect(result.trim()).toEqual(expected.trim());
  });
});
