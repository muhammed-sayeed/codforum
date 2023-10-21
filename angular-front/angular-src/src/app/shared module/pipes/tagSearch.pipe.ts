import { Pipe,PipeTransform} from  '@angular/core'
import { taglist } from 'src/app/coremodule/interfaces/taglist.interface';


@Pipe({
    name:'searchTags'
})
export class searchTagsPipe implements PipeTransform{
    transform(tags: taglist[], data:string):taglist[] {
            
        if(data ==''){
            return tags
        }else{
            let regexp = new RegExp(data,'i')
               return tags.filter((tag)=>{
                return regexp.test(tag.name)
            })
        }
        
    }
}