import { ReactNode } from 'react'
import '../style/question.scss'
import cn from 'classnames'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;    
    };
    children?: ReactNode;
    isHighlighted?: boolean | string;
    isAnsewered?: boolean | string;
}
export function Question({content, author, children, isHighlighted = false, isAnsewered = false}: QuestionProps) {
    return(
<div className={cn( 'question', { answered: isAnsewered},
 { highlighted: isHighlighted  && !isAnsewered},
)}>
    <p>{content}</p>
    <footer>
        <div className="user-info">
            <img src={author.avatar} alt={author.name} />
            <span>{author.name}</span>
        </div>
        <div>
            {children}
        </div>
    </footer>
</div>

    )
    
}