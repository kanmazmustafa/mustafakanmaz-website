import json
import sys

def dump_questions(start, end):
    with open('assets/data/questions.json', 'r', encoding='utf-8') as f:
        general = json.load(f)
    with open('assets/data/questions_states.json', 'r', encoding='utf-8') as f:
        states = json.load(f)
    
    all_questions = general + states
    # Sort just in case, though they should be ordered
    all_questions.sort(key=lambda x: x['id'])
    
    with open('dump_output.txt', 'w', encoding='utf-8') as out:
        out.write(f"--- DUMPING QUESTIONS {start} TO {end} ---\n")
        for q in all_questions:
            if start <= q['id'] <= end:
                correct_id = q['correct_option_id']
                # Default options_de or options for fallback
                options = q.get('options_de', q.get('options', {}))
                answer_text = options.get(correct_id, "UNKNOWN")
                q_text = q.get('question_de', "UNKNOWN")
                
                out.write(f"ID: {q['id']}\n")
                out.write(f"Q: {q_text}\n")
                out.write(f"A: {answer_text}\n")
                out.write("-" * 20 + "\n")
    print("Dump complete to dump_output.txt")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python dump_questions.py <start> <end>")
    else:
        dump_questions(int(sys.argv[1]), int(sys.argv[2]))
