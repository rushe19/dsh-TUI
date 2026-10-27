import React from 'react'
import { LANGS, t, type Lang } from '../i18n.js'
import { Box, Text } from '../ui.js'
import { Pane } from './design-system/Pane.js'
import { Select } from './Select.js'
import { HintLine } from './design-system/HintLine.js'

/**
 * `/lang` zh/en/ja picker: bare `/lang` opens this picker (the current
 * language marked) and Enter applies the choice through the same path as
 * `/lang <id>`.
 */
const LANG_LABELS: Record<Lang, string> = { zh: '中文', en: 'English', ja: '日本語' }
const LANG_DESC_KEYS = { zh: 'lang-zh-desc', en: 'lang-en-desc', ja: 'lang-ja-desc' } as const
export function LangPicker({
  focusIndex,
  currentLang,
  onPick,
}: {
  focusIndex: number
  currentLang: Lang
  /** Mouse pick (fullscreen): clicked row's absolute index (Chat applies
   *  the same code path as the keyboard Enter). */
  onPick?: (index: number) => void
}): React.ReactNode {
  return (
    <Pane color="permission">
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text color="remember" bold>
            {t('lang-picker-title')}
          </Text>
        </Box>
        <Select
          options={LANGS.map(lang => ({
            value: lang,
            label: LANG_LABELS[lang],
            description: t(LANG_DESC_KEYS[lang]),
          }))}
          focusIndex={focusIndex}
          selectedValue={currentLang}
          onPick={onPick ? index => onPick(index) : undefined}
        />
        <Text dimColor italic>
          <HintLine text={t('hint-confirm-exit')} />
        </Text>
      </Box>
    </Pane>
  )
}
