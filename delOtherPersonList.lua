-- 첫 번째 인자는 키, 이후의 인자들은 삭제할 필드들
local key = KEYS[1]
redis.log(redis.LOG_NOTICE, "key: " .. key); 
-- 삭제할 필드들의 범위 (150부터 200까지)
local startField = tonumber(ARGV[1])
local endField = tonumber(ARGV[2])
redis.log(redis.LOG_NOTICE, "startField: " .. startField); 
redis.log(redis.LOG_NOTICE, "endField " .. endField); 

-- 삭제할 필드들을 하나씩 순회하면서 제거
for field = startField, endField do
    redis.call('HDEL', key, tostring(field))
end

-- 결과 반환 (삭제된 필드의 개수 등을 반환할 수도 있음)
return "Fields deleted successfully"