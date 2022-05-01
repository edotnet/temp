export const Graph = ({ width }) => {
    const rest = 100 - width*10;
    return (
        <div style={{
            width: `calc(100% - ${rest}%)`,
            height: 14,
            objectFit: 'contain',
            backgroundImage: 'linear-gradient(to left, rgba(0, 103, 255, 0.61) 0%, rgba(127, 0, 255, 0.62) 35%, rgba(255, 83, 0, 0.38) 100%)'
        }}/>
    )
}
