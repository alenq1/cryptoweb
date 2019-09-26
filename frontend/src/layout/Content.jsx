import React from 'react'
//import Main from '../pages/Home'

const style = {

    backgroundColor: "black"
}

const Content = (props) => {

    const page = `<${props.page}/>`
    console.log(page, "COMPONENTE")
    return (
        <>
            {/* <Main style={style}/> */}
        </>
    )
}

export default Content
