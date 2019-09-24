using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRSv1._0._0.Models;

namespace PRSv1._0._0.Controllers
{ 
    [Route("api/Requestline")]
    [ApiController]
    public class RequestLinesAPIController : ControllerBase
    {
        private readonly AppDBContext _context;

        public RequestLinesAPIController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/RequestLinesAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RequestLine>>> GetRequestLines()
        {
            return await _context.RequestLines.ToListAsync();
        }

        // GET: api/RequestLinesAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RequestLine>> GetRequestLine(int id)
        {
            var requestLine = await _context.RequestLines.FindAsync(id);

            if (requestLine == null)
            {
                return NotFound();
            }

            return requestLine;
        }

        // PUT: api/RequestLinesAPI/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequestLine(int id, RequestLine requestLine)
        {
            if (id != requestLine.Id)
            {
                return BadRequest();
            }

            _context.Entry(requestLine).State = EntityState.Modified;

            try
            {
                var sccss = RecalculateRequestTotal(requestLine.RequestId);
                await _context.SaveChangesAsync();
                if (!sccss) {
                    return this.StatusCode(500);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestLineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RequestLinesAPI
        [HttpPost]
        public async Task<ActionResult<RequestLine>> PostRequestLine(RequestLine requestLine)
        {
            _context.RequestLines.Add(requestLine);

            var sccss = RecalculateRequestTotal(requestLine.RequestId);
            await _context.SaveChangesAsync();
            if (!sccss) {
                return this.StatusCode(500);
            }

            return CreatedAtAction("GetRequestLine", new { id = requestLine.Id }, requestLine);
        }

        // DELETE: api/RequestLinesAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RequestLine>> DeleteRequestLine(int id)
        {
            var requestLine = await _context.RequestLines.FindAsync(id);
            if (requestLine == null)
            {
                return NotFound();
            }
            var rlid = requestLine.RequestId;
            _context.RequestLines.Remove(requestLine);
            var sccss = RecalculateRequestTotal(rlid);
            await _context.SaveChangesAsync();
            if (!sccss) {
                return this.StatusCode(500);
            }

            return requestLine;
        }

        private bool RequestLineExists(int id)
        {
            return _context.RequestLines.Any(e => e.Id == id);
        }

        private bool RecalculateRequestTotal(int rId) {
            // get request
            var request = _context.Requests.FirstOrDefault(r => r.Id == rId);

            if (request == null) {
                return false;
            }
            // Calc Total
            request.Total = _context.RequestLines.Include(l => l.Product).Where(l => l.RequestId == rId).Sum(l => l.Quantity * l.Product.Price);

            // save
            _ = _context.SaveChanges();
            return true;
        }
        //private bool TestApproved(Request req) {
        //    var request = req;
        //    if (request.Total <= 50) {
        //        request.Status = "Approved";
        //        return true;
        //    } else {
        //        if (request.Status != "Review") {
        //            request.Status = "Revised";
        //        } else {
        //            request.Status = "Review";
        //        }
        //    }
        //    return false;
        //}
    }
}
