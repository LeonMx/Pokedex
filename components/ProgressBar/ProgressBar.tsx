import { FC } from 'react'
import tw, { styled, css, TwStyle } from 'twin.macro'

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
  textColor?: string
}

const StyledContainer = styled.div<Pick<ProgressBarProps, 'size'>>`
  ${tw`w-auto bg-gray-200 rounded my-2`}
  ${({ size }) => styleBySize?.[size]}
  line-height: initial;
`

const StyledFiller = styled.div<Pick<ProgressBarProps, 'percentage'>>`
  ${tw`flex items-center justify-center h-full rounded text-center text-white`}
  ${({ percentage }) => css`
    width: ${percentage <= 100 ? percentage : 100}%;
  `}
  transition: width 2s;
`

const ProgressBar: FC<ProgressBarProps> = ({
  percentage = 0,
  size = SIZE.MD,
  backgroundColor = 'blue-600',
  textColor = 'white',
  children,
}) => {
  return (
    <StyledContainer size={size}>
      <StyledFiller className={`bg-${backgroundColor} text-${textColor}`} percentage={percentage}>
        {children}
      </StyledFiller>
    </StyledContainer>
  )
}

export default ProgressBar
