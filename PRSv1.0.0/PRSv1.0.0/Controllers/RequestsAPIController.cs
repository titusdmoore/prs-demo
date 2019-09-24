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
    [Route("api/Request")]
    [ApiController]
    public class RequestsAPIController : ControllerBase
    {
        private readonly AppDBContext _context;

        public RequestsAPIController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Request
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            //return await _context.Requests.ToListAsync();
            //foreach( var x in _context.Requests) {

            //}
            var requests = await _context.Requests.ToListAsync();
            foreach (var x in requests) {
                RecalculateRequestTotal(x.Id);
            }
            return requests;
        }

        // GET: api/GetRequestsForReview
        [Route("/api/Request/Review")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequestsForReview() {
            return await _context.Requests.Where(r => r.Status == "Review").ToListAsync();

            // This is the "SQL" way
            //var items = from r in _context.Requests
            //            where r.Status == "Review"
            //            select r;
            //return await items.ToListAsync();
        }

        // GET: api/Request/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            RecalculateRequestTotal(request.Id);
            if (request == null)
            {
                return NotFound();
            }

            return request;
        }

        // GET: api/SetStatusReview/5
        [Route("/api/SetRev/{id}")]
        [HttpGet]
        public async Task<ActionResult<Request>> SetStatusReview(int id) {
            var request = await _context.Requests.FindAsync(id);

            if (request == null) {
                return NotFound();
            }
            if (request.Total <= 50) {
                request.Status = "Approved";
            } else {
                request.Status = "Review";
            }
            _ = await _context.SaveChangesAsync();
            return Ok();
        }

        //// GET: api/SetStatusReview/5
        //[Route("/api/SetReason/{id}/{reason}")]
        //[HttpGet]
        //public async Task<ActionResult<Request>> SetRejReason(int id, string reason) {
        //    var request = await _context.Requests.FindAsync(id);

        //    if (request == null) {
        //        return NotFound();
        //    }

        //    request.RejectionReason = reason;
        //    _ = await _context.SaveChangesAsync();
        //    return Ok();
        //}


        // GET: api/SetStatusReview/5
        [Route("/api/SetRej/{id}")]
        [HttpGet]
        public async Task<ActionResult<Request>> SetStatusRejected(int id) {
            var request = await _context.Requests.FindAsync(id);

            if (request == null) {
                return NotFound();
            }
            request.Status = "Rejected";
            _ = await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/SetStatusReview/5
        [Route("/api/SetApp/{id}")]
        [HttpGet]
        public async Task<ActionResult<Request>> SetStatusApproved(int id) {
            var request = await _context.Requests.FindAsync(id);

            if (request == null) {
                return NotFound();
            }
            request.Status = "Approved";
            _ = await _context.SaveChangesAsync();
            return Ok();
        }



        // PUT: api/Request/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequest(int id, Request request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }

            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
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

        // POST: api/Request
        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(Request request)
        {
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRequest", new { id = request.Id }, request);
        }

        // DELETE: api/Request/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Request>> DeleteRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return request;
        }

        private bool RequestExists(int id)
        {
            return _context.Requests.Any(e => e.Id == id);
        }

        private bool RecalculateRequestTotal(int rId) {
            // get request
            var request = _context.Requests.FirstOrDefault(r => r.Id == rId);

            if (request == null) {
                return false;
            }
            // Calc Total
            request.Total = _context.RequestLines.Include(l => l.Product).Where(l => l.RequestId == rId).Sum(l => l.Quantity * l.Product.Price);
            // update status
            //TestApproved(request);
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
        //        request.Status = "Revised";
        //        } else {
        //            request.Status = "Review";
        //        }
        //    }
        //    return false;
        //}
    }
}
