export const tasks=[
  {
    "id": "u1",
    "skill": "model",
    "title": "리본 가게",
    "prompt": "리본 한 묶음이 x원이에요. 4묶음과 포장비 700원의 총액을 ax+b로 나타낼 때 a, b를 쓰세요.",
    "formula": "ax+b",
    "fields": [
      {
        "label": "a"
      },
      {
        "label": "b"
      }
    ],
    "expected": [
      4,
      700
    ],
    "hint": "묶음 값 4x에 포장비를 더해요."
  },
  {
    "id": "u2",
    "skill": "model",
    "title": "남은 물",
    "prompt": "물 18L에서 화분 한 개마다 x L씩, 화분 3개에 물을 주었어요. 남은 양을 ax+b로 나타낼 때 a, b를 쓰세요.",
    "formula": "ax+b",
    "fields": [
      {
        "label": "a"
      },
      {
        "label": "b"
      }
    ],
    "expected": [
      -3,
      18
    ],
    "hint": "전체 18에서 사용한 양 3x를 빼요."
  },
  {
    "id": "u3",
    "skill": "notation",
    "title": "곱셈 기호를 줄이면",
    "prompt": "x×x×3을 간단히 나타낸 식을 고르세요.",
    "formula": "\\mathrm A:3x^2\\qquad \\mathrm B:3x\\qquad \\mathrm C:x^3",
    "fields": [
      {
        "label": "알맞은 식",
        "options": [
          "A",
          "B",
          "C"
        ]
      }
    ],
    "expected": [
      "A"
    ],
    "hint": "x가 두 번 곱해져요. 같은 문자의 곱은 거듭제곱으로 써요."
  },
  {
    "id": "u4",
    "skill": "notation",
    "title": "괄호까지 나누어요",
    "prompt": "(a+6)÷4를 나타낸 식을 고르세요. a+6 전체를 나누는 것을 확인해요.",
    "formula": "\\mathrm A:a+\\frac{6}{4}\\qquad \\mathrm B:\\frac{a+6}{4}",
    "fields": [
      {
        "label": "알맞은 식",
        "options": [
          "A",
          "B"
        ]
      }
    ],
    "expected": [
      "B"
    ],
    "hint": "분자에 괄호 안 전체가 들어가야 해요."
  },
  {
    "id": "u5",
    "skill": "evaluate",
    "title": "음수와 제곱",
    "prompt": "x=-3을 각각 대입해서 두 식의 값을 구하세요.",
    "formula": "x^2+2x\\qquad 8-2x",
    "fields": [
      {
        "label": "첫 번째 식의 값"
      },
      {
        "label": "두 번째 식의 값"
      }
    ],
    "expected": [
      3,
      14
    ],
    "hint": "(-3)²은 9예요. 8-2×(-3)은 8에 6을 더해요."
  },
  {
    "id": "u6",
    "skill": "evaluate",
    "title": "분수도 수예요",
    "prompt": "x=0.5를 대입하세요. 결과는 소수 또는 분수로 써도 좋아요.",
    "formula": "4(x+2)\\qquad \\frac{x}{2}+1",
    "fields": [
      {
        "label": "첫 번째 식의 값"
      },
      {
        "label": "두 번째 식의 값"
      }
    ],
    "expected": [
      10,
      1.25
    ],
    "hint": "괄호 안을 먼저 계산해요. x/2는 0.5/2예요."
  },
  {
    "id": "u7",
    "skill": "compare",
    "title": "값이 달라지는 두 식",
    "prompt": "x=1일 때와 x=5일 때 각각 더 큰 값을 만드는 식을 골라요. 이유도 적어 보세요.",
    "formula": "\\mathrm A:2x+1\\qquad \\mathrm B:x+4",
    "fields": [
      {
        "label": "x=1일 때 더 큰 식",
        "options": [
          "A",
          "B"
        ]
      },
      {
        "label": "x=5일 때 더 큰 식",
        "options": [
          "A",
          "B"
        ]
      }
    ],
    "expected": [
      "B",
      "A"
    ],
    "hint": "각 경우에 두 식 모두 대입해 비교해요. 계수만으로 정하지 않아요."
  },
  {
    "id": "u8",
    "skill": "compare",
    "title": "한 식으로 여러 경우",
    "prompt": "한 장에 x원인 입장권 3장과 보관함 200원의 비용을 나타낸 식은 무엇인가요? x가 바뀔 때 같은 식이 어떻게 도움이 되는지 설명해 보세요.",
    "formula": "\\mathrm A:3(x+200)\\qquad \\mathrm B:3x+200",
    "fields": [
      {
        "label": "총비용을 나타내는 식",
        "options": [
          "A",
          "B"
        ]
      },
      {
        "label": "x=600일 때 총비용"
      }
    ],
    "expected": [
      "B",
      2000
    ],
    "hint": "보관함 비용은 한 번만 더해요. 문자만 바꾸어 여러 가격을 계산할 수 있어요."
  }
];
export function number(v){const s=String(v).trim();if(!s)return NaN;if(/^[+-]?\d+\s*\/\s*[+-]?\d+$/.test(s)){const[a,b]=s.split('/').map(Number);return b?a/b:NaN}return Number(s)}
export function check(t,a){return a.length===t.expected.length&&a.every((v,i)=>String(v).trim()&&(typeof t.expected[i]==='number'?number(v)===t.expected[i]:v===t.expected[i]))}
export function submit(log,t,answers,explanation,helped,elapsedMs=0){const previous=log.filter(r=>r.task===t.id),correct=Boolean(check(t,answers));return{version:'2026.11.05.1',task:t.id,skill:t.skill,answers:[...answers],explanation,helped:Boolean(helped),attempt:previous.length+1,first:!previous.length,correct,independent:!previous.length&&!helped&&correct,at:new Date().toISOString(),elapsedMs}}
export function summary(log,skill){return new Set(log.filter(r=>r.skill===skill&&r.independent).map(r=>r.task)).size}
