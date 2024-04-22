export default function Stringslice(data,sliceEnd){
    return data.length>15 ? data.slice(1,sliceEnd)+'...' : data
}