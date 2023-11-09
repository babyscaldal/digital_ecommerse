import styled from "styled-components"

const ImageWrapper = styled.div<{ $height?: string; $width?: string }>`
  height: ${(props) => (props.$height ? props.$height : "100px")};
  width: ${(props) => (props.$width ? props.$width : "100px")};
`

const StyledImage = styled.img<{ $contain?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => (props.$contain ? "contain" : "cover")};
  object-position: center;
`

interface IImage {
  src: string
  alt?: string
  height?: string
  width?: string
  className?: string
  contain?: boolean
}

export default function Image({
  src,
  alt,
  height,
  width,
  className,
  contain,
}: IImage) {
  return (
    <ImageWrapper className={className} $height={height} $width={width}>
      <StyledImage
        className="img-fluid"
        $contain={contain}
        src={src}
        alt={alt}
      />
    </ImageWrapper>
  )
}
