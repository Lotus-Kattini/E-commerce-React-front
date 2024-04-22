import Skeleton from "react-loading-skeleton"

function Skelton(props) {

    const skeltonlength=Array.from({length:props.length}).map((index)=>
    <div className={`${props.classes}`} key={index}>
    <div className="mx-1">
        <Skeleton baseColor="white" highlightColor="gray" width={props.width} height={props.height}/>
    </div>
</div>
    )

  return skeltonlength;
}

export default Skelton