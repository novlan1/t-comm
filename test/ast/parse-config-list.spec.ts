import { parseReplaceConfig } from '../../src';


const list: any = [
  {
    source: [
      'src/common',
      'src/common/network',
      'src/common/network/post',
      'src/common/network-v2',
    ],
    importedList: [
      'post',
    ],
    target: '@tx/pmd-network',
  },
  {
    source: 'src/common/report/data-center/merchant-report',
    importedList: [
      'reportBrandExposure',
      'reportMerchantExposure',
    ],
    target: '@tx/pmd-report',
  },
  {
    source: 'src/common/network/axios',
    importedList: [
      {
        sourceType: 'ImportDefaultSpecifier',
        targetName: 'axios',
        targetType: 'ImportSpecifier',
      },
    ],
    target: '@tx/pmd-tools/lib/axios',
  },
];

const newList: any = [
  {
    source: 'src/common',
    target: '@tx/pmd-network',
    sourceName: 'post',
    sourceType: 'ImportSpecifier',
    targetName: 'post',
    targetType: 'ImportSpecifier',
  },
  {
    source: 'src/common/network',
    target: '@tx/pmd-network',
    sourceName: 'post',
    sourceType: 'ImportSpecifier',
    targetName: 'post',
    targetType: 'ImportSpecifier',
  },
  {
    source: 'src/common/network/post',
    target: '@tx/pmd-network',
    sourceName: 'post',
    sourceType: 'ImportSpecifier',
    targetName: 'post',
    targetType: 'ImportSpecifier',
  },
  {
    source: 'src/common/network-v2',
    target: '@tx/pmd-network',
    sourceName: 'post',
    sourceType: 'ImportSpecifier',
    targetName: 'post',
    targetType: 'ImportSpecifier',
  },
  {
    source: 'src/common/report/data-center/merchant-report',
    target: '@tx/pmd-report',
    sourceName: 'reportBrandExposure',
    sourceType: 'ImportSpecifier',
    targetName: 'reportBrandExposure',
    targetType: 'ImportSpecifier',
  },
  {
    source: 'src/common/report/data-center/merchant-report',
    target: '@tx/pmd-report',
    sourceName: 'reportMerchantExposure',
    sourceType: 'ImportSpecifier',
    targetName: 'reportMerchantExposure',
    targetType: 'ImportSpecifier',
  },
  {
    source: 'src/common/network/axios',
    target: '@tx/pmd-tools/lib/axios',
    sourceName: '',
    sourceType: 'ImportDefaultSpecifier',
    targetName: 'axios',
    targetType: 'ImportSpecifier',
  },
];
describe('parseReplaceConfig', () => {
  it('parseReplaceConfig', () => {
    expect(parseReplaceConfig(list)).toEqual(newList);
  });
});
