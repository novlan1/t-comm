import { parseChangeLog } from '../../src';

describe('parseChangeLog', () => {
  it('plugin-light monorepo', () => {
    const changelogStr = `## <small>0.0.11 (2024-09-19)</small>

* chore: add meta in pkg.json ([3f6088c](https:///git.com/h5/plugin-light/commits/3f6088c))

## <small>0.0.10 (2024-09-19)</small>

* chore: add release script ([defe6af](https:///git.com/h5/plugin-light/commits/defe6af))
`;
    const targetVersion = '0.0.11';

    const result = parseChangeLog({
      changelogStr,
      targetVersion,
    });

    expect(result).toBe(`
- chore: add meta in pkg.json ([3f6088c](https:///git.com/h5/plugin-light/commits/3f6088c))
`);
  });


  it('press-ui', () => {
    const changelogStr = `### [2.1.21](https://git.com/support/press-ui/compare/v2.1.20...v2.1.21) (2024-09-12)


### ✨ Features | 新功能

* **picker-plus:** resetColumn增加value参数 ([6846e3a](https://git.com/support/press-ui/commit/6846e3ad471e68e01f6c1241897e5fc086e8e870))

### [2.1.20](https://git.com/support/press-ui/compare/v2.1.19...v2.1.20) (2024-09-12)


### ✨ Features | 新功能

* **picker-plus:** 增加reset方法 ([44759f8](https://git.com/support/press-ui/commit/44759f8c8c8757a395a250a23ed670129ec75bc4))

`;
    const targetVersion = '2.1.21';

    const result = parseChangeLog({
      changelogStr,
      targetVersion,
    });

    expect(result).toBe(`

### ✨ Features | 新功能

- **picker-plus:** resetColumn增加value参数 ([6846e3a](https://git.com/support/press-ui/commit/6846e3ad471e68e01f6c1241897e5fc086e8e870))
`);
  });
});
