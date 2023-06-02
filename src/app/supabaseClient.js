import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://xwmzzvbvspligilqhzsj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3bXp6dmJ2c3BsaWdpbHFoenNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTY4MTk5MSwiZXhwIjoyMDAxMjU3OTkxfQ.aD2KEXnoWORRMAXlEgP81fOQJCd1KQWligm0-Fg58vQ"
);
