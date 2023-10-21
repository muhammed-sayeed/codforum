import { Pipe,PipeTransform} from '@angular/core'

@Pipe({
    name:'Decimal'
})
export class numberToDecimel implements PipeTransform{
    transform(value: [],data:number) {
         return data.toFixed(2)
    }
}