import {writeFileSync} from 'node:fs';import {optimum,greedy,won,value} from './engine.mjs';
const c=(tex,a,b,q=0)=>({tex,a,b,q});const pool=[c('x',1,0),c('2x',2,0),c('3x',3,0),c('x+3',1,3),c('2x+2',2,2),c('8-x',-1,8),c('10-2x',-2,10),c('x+6',1,6),c('2(x+1)',2,2),c('3(x-1)',3,-3),c('x^2',0,0,1),c('x^2+2',0,2,1),c('12-x^2',0,12,-1),c('4-x',-1,4),c('\\frac{x}{2}+4',.5,4),c('2x+5',2,5),c('-3x+2',-3,2),c('x^2-x',-1,0,1)];
const specifications=[
['첫 별의 실',[2,2],['대입과 문자의 곱셈'],[0,1,3]],
['다음 별의 몫',[1,3],['지금 작은 식보다 나중에 필요한 식 보존'],[2,4,7]],
['빛을 아끼는 밤',[2,4,1],['모든 주문을 통틀어 총소비 비교'],[0,1,2,3,4,5]],
['바람이 바뀌면',[4,1,3],['x 변화로 식의 값 순위 역전'],[1,3,4,5,6,7]],
['영이 되는 순간',[0,3,1],['x=0과 상수항'],[0,1,3,4,5,6]],
['거꾸로 부는 바람',[-1,2,-2],['음수 대입과 뺄셈 순서'],[3,4,5,6,7,13,16]],
['괄호 안의 약속',[3,-1,2,0],['괄호 전체에 적용되는 곱셈'],[3,5,6,7,8,9,16]],
['제곱의 빛',[-2,3,-1,2],['음수의 제곱과 일차식 비교'],[3,5,6,10,11,12,16]],
['반쪽 바람',[.5,2,1.5,4],['분수 대입, 같은 식의 다른 값'],[1,3,4,5,8,14,15]],
['남겨 둔 은실',[-3,0,2,-1,3],['부호·제곱·총소비의 결합'],[5,6,7,10,11,12,16,17]],
['긴 밤의 선택',[2,4,.5,-2,1],['남은 주문 전체와 예산을 함께 고려'],[3,5,6,8,10,11,14,16]],
['별자리의 완성',[-2,1.5,0,3,-1,2],['음수·분수·괄호·제곱을 같은 선택 규칙으로 결합'],[3,5,8,10,11,12,14,16]]];
let seed=71431;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};const levels=[];
for(let k=0;k<specifications.length;k++){const[title,xs,decisions,ids]=specifications[k];let l;if(k===0)l={cards:ids.map(i=>pool[i]),orders:[{x:2,need:2},{x:2,need:4}],budget:6};else if(k===1)l={cards:[pool[2],pool[4],c('7',0,7)],orders:[{x:1,need:3},{x:3,need:9}],budget:13};else{for(let tries=0;tries<6000;tries++){const cards=ids.map(i=>pool[i]);const order=ids.map((_,i)=>i).sort(()=>rnd()-.5).slice(0,xs.length);const orders=xs.map((x,j)=>{const v=value(cards[order[j]],x);return{x,need:Math.max(1,Math.floor(v-rnd()*2))}});l={cards,orders};const o=optimum(l);if(!Number.isFinite(o.cost))continue;l.budget=o.cost+(k===2?1:0);const rankSwap=cards.some((a,i)=>cards.some(b=>(value(a,xs[0])-value(b,xs[0]))*(value(a,xs[1])-value(b,xs[1]))<0));if(rankSwap&&!won(l,greedy(l))&&!won(l,greedy(l,true)))break;l=null;}if(!l)throw Error('No suitable level '+k)}levels.push({id:k+1,title,chapter:k<4?'새벽의 실':k<8?'달빛의 실':'별자리의 실',decisions,...l});}
writeFileSync('levels.mjs','export const levels='+JSON.stringify(levels,null,2)+';\n');writeFileSync('evidence/solutions.json',JSON.stringify(levels.map(l=>({id:l.id,...optimum(l),greedyWins:won(l,greedy(l)),largestWins:won(l,greedy(l,true))})),null,2));console.log(levels.map(l=>({id:l.id,cost:optimum(l).cost,budget:l.budget,path:optimum(l).path,greedy:won(l,greedy(l))})));
