import { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';


import styles from './faqQuestion.module.css';

interface Props {
    question: string;
    children: string;
}

const FaqQuestion = ({ question, children }: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <article className={styles.question}>
            <div className={styles.question__top}>
                <p className={styles.question__question}>{question}</p>
                <button onClick={() => setIsExpanded(prev => !prev)} title='Rozwiń/zwiń odpowiedź' className={styles.question__toggle}>
                    {
                        isExpanded ? <AiOutlineMinus /> : <AiOutlinePlus />
                    }
                </button>
            </div>
            <p className={`${styles.question__answer} ${isExpanded && styles.question__answer_active}`}>{children}</p>
        </article>
    )
}

export default FaqQuestion
