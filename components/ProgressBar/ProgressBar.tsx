import { FC } from 'react'
import tw, { styled, css, TwStyle, theme } from 'twin.macro'

export const SIZE = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const

type Size = typeof SIZE[keyof typeof SIZE]

const styleBySize: Record<Size, TwStyle> = {
  [SIZE.XS]: tw`h-3 text-xs`,
  [SIZE.SM]: tw`h-4 text-sm`,
  [SIZE.MD]: tw`h-6 text-base`,
  [SIZE.LG]: tw`h-8 text-lg`,
}

export type ProgressBarProps = {
  percentage?: number
  size?: Size
  backgroundColor?: string
  color?: string
}

const StyledContainer = styled.div<Pick<ProgressBarProps, 'size'>>`
  ${tw`w-auto bg-gray-200 rounded my-2`}
  ${({ size }) => styleBySize?.[size]}
  line-height: initial;
`

const StyledFiller = styled.div<Pick<ProgressBarProps, 'percentage' | 'backgroundColor' | 'color'>>`
  ${tw`flex items-center justify-center h-full rounded text-center text-white`}
  ${({ percentage, backgroundColor, color }) => css`
    width: ${percentage <= 100 ? percentage : 100}%;
    ${backgroundColor && `background-color: ${backgroundColor};`}
    ${color && `color: ${color};`}
    transition: width 2s;
  `}
`
const backgroundColorDefault = theme`colors.blue.600`
const colorDefault = theme`colors.white`

const ProgressBar: FC<ProgressBarProps> = ({
  percentage = 0,
  size = SIZE.MD,
  backgroundColor = backgroundColorDefault,
  color = colorDefault,
  children,
}) => {
  return (
    <StyledContainer size={size}>
      <StyledFiller backgroundColor={backgroundColor} color={color} percentage={percentage}>
        {children}
      </StyledFiller>
    </StyledContainer>
  )
}

export default ProgressBar
